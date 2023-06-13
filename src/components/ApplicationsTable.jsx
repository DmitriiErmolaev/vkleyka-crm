import React, {useState, useEffect} from "react";
import {Layout, Select, Row, Col, Space, Button, Menu,  Radio} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, query, where, orderBy, addDoc, setDoc, doc, limit, getCountFromServer} from "firebase/firestore";
import {firestore} from "../firebase";
import TableComponent from "./TableComponent";
import {appStatus} from "../table-columns-config";

const APPS_REF = collection(firestore, "applications")
const COUNTRIES_REF = collection(firestore, "countries")
const TABLE_PAGE_ITEMS_NUMBER = 10;

const ApplicationsTable = ({}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [columnSorting, setColumnSorting] = useState(null);
  const [status, setStatus] = useState(null);
  const [curTablePage, setCurTablePage] = useState();
  const [firstApplicationRef, setFirstApplicationRef] = useState();
  const [lastApplicationRef, setLastApplicationRef] = useState();


  let filters = [];
  if(columnSorting && columnSorting.order) {
    filters.push(orderBy(columnSorting.column, columnSorting.order))
  } else {
    filters.push(orderBy("date", "desc"))
  }
  if(selectedCountry) {
    filters.push(where("country", "==", selectedCountry));
  }
  if(status && status !== "all") {
    filters.push(where("status", "==", status))
  }
  const queryForCountries = query(COUNTRIES_REF);
  const queryForAppsWithoutLimit = query(APPS_REF, ...filters);
  const queryForAppsWithLimit = query(APPS_REF, ...filters, limit(10));

  const [countriesCollSnapshot, countriesLoading, countriesError] = useCollection(queryForCountries);
  const [appsCollSnapshot, tableLoading, tableError] = useCollection(queryForAppsWithoutLimit);
  const [tableDataBeforeChanging, setTableDataBeforeChanging] = useState(null);

  useEffect(()=> {
    if(array.length !== 0 ){
      setTableDataBeforeChanging(array)
    }
  }, [appsCollSnapshot])

  let array = [];
  let dropdownMenuItems = [];
  let refArray = []
 
  if(!countriesLoading )
  countriesCollSnapshot.forEach(countrySnapshot => {
    const countryData = countrySnapshot.data()
    dropdownMenuItems.push(
      {
        value: countryData.name,
        label: countryData.name,
      }
    )
  })

  // TODO: Убрать. Временная проверка на ошибки при запросе данных таблицы
  if(!tableLoading) {
    if(tableError) {
      console.log(tableError)
    } else {
      console.log(appsCollSnapshot.size)
      console.log(appsCollSnapshot[0])
      console.log(appsCollSnapshot[9])
      appsCollSnapshot.forEach(docSnapshot => {
        array.push(docSnapshot.data())
        refArray.push(docSnapshot.ref)
      })
    }
  }
  
  let dirstDocRef = refArray[0];
  let lastDocRef = refArray[TABLE_PAGE_ITEMS_NUMBER - 1];
  //INFO: реализация  кнопок-фильтров через меню-бар: полоска снизу, а кнопки не стилизуются. Стремно выглядит
    // function handleStatusButtonСlick({ item, key, keyPath, domEvent }) {
    //   if(key === "all") {
    //     setStatus(null)
    //   }
    //   setStatus(key);
    // }
    //
    // const statusMenuItems = [
    //   {
    //     key: "all",
    //     label: (
    //       <Button 
    //         size="large" 
    //         data-status="все" 
    //         shape="round" 
    //         // onClick={btnClick}
    //       >Все</Button>
    //     ),
    //   },
    //   {
    //     key: appStatus.new,
    //     label: (
    //       <Button 
    //         size="large" 
    //         data-status="все" 
    //         shape="round" 
    //         // onClick={btnClick}
    //       >{appStatus.new}</Button>
    //     ),
    //   },
    //   {
    //     key: appStatus.inWork,
    //     label: (
    //       <Button 
    //         size="large" 
    //         data-status="все" 
    //         shape="round" 
    //         // onClick={btnClick}
    //       >{appStatus.inWork}</Button>
    //     ),
    //   },
    //   {
    //     key:appStatus.finished,
    //     label: (
    //       <Button 
    //         size="large" 
    //         data-status="завершено" 
    //         style={{border:"none", backgroundColor:"inherit", boxShadow:"none"}} 
    //         // onClick={btnClick}
    //       >{appStatus.finished}</Button>
    //     ),
    //   },
    // ]

  //INFO: Реализация кнопок-фильтров через самостоятельные кнопки. Нельзя влиять на состояние :active...
    // function btnClick(e) {
    //   console.log(e)
    //   const status = e.currentTarget.dataset.status;
    //   (status === "all") ? setStatus(null) : setStatus(e.currentTarget.dataset.status)
    // }

  

  // INFO: реализация кнопок как фильтры в качестве радиокнопок. Кнопки веделены после выбора. Можно выбрать только одну
  function radioChange(e) {
    setStatus(e.target.value)
  }

  return (
    <Layout style={{height:"calc(100vh - 101px)"}}>
      <Space direction="vertical" size="large">
        <Radio.Group 
          optionType="button" 
          value={status} 
          onChange={radioChange} 
          size="large"
          // buttonStyle="solid"
          style={{marginLeft:"30px"}}
        >
          <Radio value="all">все</Radio>
          <Radio value={appStatus.new}>Новые</Radio>
          <Radio value={appStatus.inWork}>В работе</Radio>
          <Radio value={appStatus.finished}>Завершенные</Radio>
        </Radio.Group>

        {/* <Menu 
          theme="dark"
          mode="horizontal" 
          items={statusMenuItems}
          selectedKeys={[status]}
          onClick={handleStatusButtonСlick}
        ></Menu> */}

        {/* <Row style={{marginLeft:"30px"}}>
          <Col span={2}>
            <Button size="large" data-status="all" shape="round" onClick={btnClick}>Все</Button>
          </Col>
          <Col span={2}>
            <Button size="large" data-status={appStatus.new} shape="round" onClick={btnClick}>{appStatus.new}</Button>
          </Col>
          <Col span={3}>
            <Button size="large" data-status={appStatus.inWork} shape="round" onClick={btnClick}>{appStatus.inWork}</Button>
          </Col>
          <Col span={3}>
            <Button size="large" data-status={appStatus.finished} style={{border:"none", backgroundColor:"inherit", boxShadow:"none"}} onClick={btnClick}>{appStatus.finished}</Button>
          </Col>
        </Row> */}
        <Select 
          showSearch
          allowClear="true"
          placeholder="Выберите страну"
          clearIcon={<CloseCircleOutlined style={{color:"red"}}/>}
          onChange={setSelectedCountry}
          value={selectedCountry}
          options={dropdownMenuItems}
          style={{
            marginLeft:"30px",
            width: 180,
          }}
          size="large"
        />
      </Space>
      <TableComponent 
        dirstDocRef = {dirstDocRef}
        lastDocRef = {lastDocRef}
        setFirstApplicationRef = {setFirstApplicationRef}
        setLastApplicationRef = {setLastApplicationRef}
        setCurTablePage = {setCurTablePage}
        queryForAppsWithoutLimit = {queryForAppsWithoutLimit}
        tableDataBeforeChanging={tableDataBeforeChanging} 
        appsCollSnapshot={appsCollSnapshot} 
        array={array} 
        setColumnSorting={setColumnSorting} 
        tableLoading={tableLoading}
      />
    </Layout>
  )
}

export default ApplicationsTable;
// export {TABLE_PAGE_ITEMS_NUMBER}
