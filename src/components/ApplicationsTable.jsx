import React, {useState, useEffect, useContext} from "react";
import {Layout, Select, Row, Col, Space, Button, Menu,  Radio} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, query, where, orderBy, addDoc, setDoc, doc, limit, getCountFromServer} from "firebase/firestore";
import {firestore} from "../firebase";
import TableComponent from "./TableComponent";
import {appStatus} from "../table-columns-config";
import SelectComponent from "./selectors/SelectComponent";
import {UserContext} from "../context.js";

const roleBasedContent = {
  admin: {
    collectionConstraints: "all-applications",
    
  },
  operator: {
    collectionConstraint: "assigned-only"
  }
}

const APPS_REF = collection(firestore, "applications")
const TABLE_PAGE_ITEMS_NUMBER = 10;

const ApplicationsTable = ({}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [columnSorting, setColumnSorting] = useState(null);
  const [status, setStatus] = useState(null);
  const [curTablePage, setCurTablePage] = useState();
  const [firstApplicationRef, setFirstApplicationRef] = useState();
  const [lastApplicationRef, setLastApplicationRef] = useState();
  const {user} = useContext(UserContext);
  const role = "operator";


  // const roleBasedQueryConstraints = roleBasedContent[role].collectionConstraint;
  // if (roleBasedQueryConstraints === "assigned-only") {
  //   filters.push(where())
  // }
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
  const queryForAppsWithoutLimit = query(APPS_REF, ...filters);
  const queryForAppsWithLimit = query(APPS_REF, ...filters, limit(10));

  const [appsCollSnapshot, tableLoading, tableError] = useCollection(queryForAppsWithoutLimit);
  const [tableDataBeforeChanging, setTableDataBeforeChanging] = useState(null);

  useEffect(()=> {
    if(array.length !== 0 ){
      setTableDataBeforeChanging(array)
    }
  }, [appsCollSnapshot])

  let array = [];
  let refArray = []
 
  
  // TODO: Убрать. Временная проверка на ошибки при запросе данных таблицы
  if(!tableLoading) {
    if(tableError) {
      console.log(tableError)
    } else {
      appsCollSnapshot.forEach(docSnapshot => {
        array.push(docSnapshot.data())
        refArray.push(docSnapshot.ref)
      })
    }
  }
  
  let firstDocRef = refArray[0];
  let lastDocRef = refArray[TABLE_PAGE_ITEMS_NUMBER - 1];

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
          style={{marginLeft:"30px"}}
        >
          <Radio value="all">Все</Radio>
          <Radio value={appStatus.new}>Новые</Radio>
          <Radio value={appStatus.inWork}>В работе</Radio>
          <Radio value={appStatus.finished}>Завершенные</Radio>
        </Radio.Group>
        <SelectComponent 
          collectionType={"countries"} 
          data={{"setSelectedCountry": setSelectedCountry, "selectedCountry": selectedCountry}}
        />
      </Space>
      <TableComponent 
        firstDocRef = {firstDocRef}
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
