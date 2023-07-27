import React, {useState, useEffect, useContext} from "react";
import {Layout, Space, Radio} from "antd";
import { where } from "firebase/firestore";
import {useCollection,useDocument} from "react-firebase-hooks/firestore";
import TableComponent from "./TableComponent";
import { buttonFilterSettings} from "../../models/status/status";
import { getFilters, getDataForTable} from "../../models/applications/table-data-processing";
import { findAuthorizedOperatorName } from "../../models/operator/operators-data-processing";
import SelectComponent from "../selectors/SelectComponent";
import Error from "../error/Error";
import {ProgramContext} from "../../models/context.js";
import {getUsersQuery} from "../../models/applicants/applicants"
import {getAppsCollRef} from "../../models/applications/applications"
import {getAllCountriesRef} from "../../models/countries/countries"
import {getSingleFieldFromDocSnapshot, getDataFromCollSnapshot, getQueryWithConstraints} from "../../models/data-processing";

const ALL_COUNTRIES_REF = getAllCountriesRef();
const USERS_QUERY = getUsersQuery();
const APPS_REF = getAppsCollRef();

// const TABLE_PAGE_ITEMS_NUMBER = 10; // NOTE: Для пагинации

const AllApplications = () => {
  const {role, user, admins} = useContext(ProgramContext);
  const [countriesDocSnapshot, countriesLoading, countriesError] = useDocument(ALL_COUNTRIES_REF);
  const [usersCollSnapshot, usersLoading, usersError] = useCollection(USERS_QUERY);
  const [selectedCountry, setSelectedCountry] = useState({value:null, label:null});
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  // const [curTablePage, setCurTablePage] = useState();  // NOTE: Для пагинации
  // const [firstApplicationRef, setFirstApplicationRef] = useState();  // NOTE: Для пагинации
  // const [lastApplicationRef, setLastApplicationRef] = useState();  // NOTE: Для пагинации
  
  // TODO: обернуть в одну функцию - getInitialConstraint/getRoleBasedConstraint
  const initialConstraint = (role === "operator") ?  where("preparedInformation.assignedTo", "==", user.uid) : null;
  let filters = getFilters(selectedCountry,selectedStatus,selectedColumn, initialConstraint );

  /* TODO: для пагинации: запрос на 10 документов коллекции
  * const queryForAppsWithLimit = query(APPS_REF, ...filters, limit(10));  // NOTE: Для пагинации
  */

  const queryForAppsWithoutLimit = getQueryWithConstraints(APPS_REF, filters);
  const [appsCollSnapshot, tableLoading, tableError] = useCollection(queryForAppsWithoutLimit);
  const [tableDataBeforeChanging, setTableDataBeforeChanging] = useState(null);

  useEffect(()=> {
    /*
      Сохраняет массив с данными таблицы, чтобы они отрисовывались пока новые данные грузятся при пагинации. 
      Для предотвращение прыгания таблицы а так же лучшего визуального восприятия смены данных 
    */
    if(arrangedTableData.length !== 0 ) {
      setTableDataBeforeChanging(arrangedTableData);
    }
  }, [appsCollSnapshot]) // TODO: вынести в стейт? или найти другой  вариант? 

  let countries = [];
  let arrangedTableData = [];
  let applications = [];
  // let refArray = []; // NOTE: Для пагинации. массив ссылок на документы
  
  if(!tableLoading && !countriesLoading && !usersLoading) {
    if(tableError || countriesError || usersError) {
      return <Error error={tableError || countriesError || usersError}/>
    } else {
      applications = getDataFromCollSnapshot(appsCollSnapshot);
      const applicants = getDataFromCollSnapshot(usersCollSnapshot);
      countries = getSingleFieldFromDocSnapshot(countriesDocSnapshot, "countries"); // массив объектов-стран
      arrangedTableData = getDataForTable(applications, applicants, countries);
      // refArray = getDocsRefs(appsCollSnapshot);  NOTE: Для пагинации
    }
  }
  
  /* TODO: для пагинации: запоминание ссылки на 1 и 10 документы
  * let firstDocRef = refArray[0];  // NOTE: Для пагинации
  * let lastDocRef = refArray[TABLE_PAGE_ITEMS_NUMBER - 1];
  */
  
  const radioChange = (e) => {
    setSelectedStatus(e.target.value)
  }
  return (
    <Layout 
      style={{
        padding:"30px"
      }}
    >
      <Space direction="vertical" size="large">
        <Radio.Group 
          optionType="button" 
          value={selectedStatus} 
          onChange={radioChange} 
          size="large"
        >
          <Radio value="allStatuses">Все</Radio>
          <Radio value={buttonFilterSettings.new.value}>{buttonFilterSettings.new.text}</Radio>
          <Radio value={buttonFilterSettings.inProgress.value}>{buttonFilterSettings.inProgress.text}</Radio>
          <Radio value={buttonFilterSettings.finished.value}>{buttonFilterSettings.finished.text}</Radio>
        </Radio.Group>
        <SelectComponent 
          collectionType={"countries"} 
          data={
            {
              countries: countries,
              setSelectedCountry: setSelectedCountry, 
              selectedCountry: selectedCountry,
            }
          }
        />
      </Space>
      <TableComponent 
        role = {role}
        // TODO: для пагинации.
        // firstDocRef = {firstDocRef}
        // lastDocRef = {lastDocRef}
        // setFirstApplicationRef = {setFirstApplicationRef}
        // setLastApplicationRef = {setLastApplicationRef}
        // setCurTablePage = {setCurTablePage}
        tableDataBeforeChanging={tableDataBeforeChanging} 
        arrangedTableData={arrangedTableData} 
        setSelectedColumn={setSelectedColumn} 
        tableLoading={tableLoading}
      />
    </Layout>
  )
}

export default AllApplications;
