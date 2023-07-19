import React, {useState, useEffect, useContext} from "react";
import {Layout, Space, Radio} from "antd";
import { where } from "firebase/firestore";
import {useCollection,useDocument} from "react-firebase-hooks/firestore";
import TableComponent from "./TableComponent";
import {testStatuses, buttonFilterSettings} from "../../models/status/status";
import { getFilters, getDataForTable} from "../../models/applications/table-data-processing";
import { findAuthorizedOperatorName } from "../../models/operator/operators-data-processing";
import {roleBasedContent} from "../../models/role-based-rules";
import SelectComponent from "../selectors/SelectComponent";
import {UserContext, AdminsContext} from "../../models/context.js";
import {getUsersQuery} from "../../models/applicants/applicants"
import {getAppsCollRef} from "../../models/applications/applications"
import {getAdminsRef} from "../../models/operator/operators"
import {getAllCountriesRef} from "../../models/countries/countries"
import {getSingleFieldFromDocSnapshot, getDataFromCollSnapshot, getQueryWithConstraints} from "../../models/data-processing";
import { ApplicationsContext } from "../../models/context.js";

const ALL_COUNTRIES_REF = getAllCountriesRef();
const USERS_QUERY = getUsersQuery();
const APPS_REF = getAppsCollRef();

const TABLE_PAGE_ITEMS_NUMBER = 10;

const AllApplications = () => {
  const {role, user} = useContext(UserContext);
  const {admins} = useContext(AdminsContext)
  const [countriesDocSnapshot, countriesLoading, countriesError] = useDocument(ALL_COUNTRIES_REF);
  const [usersCollSnapshot, usersLoading, usersError] = useCollection(USERS_QUERY);
  const [selectedCountry, setSelectedCountry] = useState({value:null, label:null});
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [curTablePage, setCurTablePage] = useState();
  const [firstApplicationRef, setFirstApplicationRef] = useState();
  const [lastApplicationRef, setLastApplicationRef] = useState();
  
  // TODO: обернуть в одну функцию - getInitialConstraint/getRoleBasedConstraint
  const authorizedOperatorName = findAuthorizedOperatorName(admins, user)
  const initialConstraint = (role === "operator") ?  where("preparedInformation.assignedTo", "==", authorizedOperatorName) : null;
  let filters = getFilters(selectedCountry,selectedStatus,selectedColumn, initialConstraint );

  /* TODO: для пагинации: запрос на 10 документов коллекции
  * const queryForAppsWithLimit = query(APPS_REF, ...filters, limit(10)); 
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
  }, [appsCollSnapshot])

  let countries = [];
  let arrangedTableData = [];
  let applications = [];
  // let refArray = [];
  
  // TODO: Убрать. Временная проверка на ошибки при запросе данных таблицы
  if(!tableLoading && !countriesLoading && !usersLoading) {
    if(tableError || countriesError || usersError) {
      console.log(tableError)
      console.log(countriesError)
      console.log(usersError)
    } else {
      applications = getDataFromCollSnapshot(appsCollSnapshot);
      const applicants = getDataFromCollSnapshot(usersCollSnapshot);
      countries = getSingleFieldFromDocSnapshot(countriesDocSnapshot, "countries"); // массив объектов-стран
      arrangedTableData = getDataForTable(applications, applicants, countries);
      // refArray = getDocsRefs(appsCollSnapshot);  
    }
  }
  
  /* TODO: для пагинации: запоминание ссылки на 1 и 10 документы
  * let firstDocRef = refArray[0];
  * let lastDocRef = refArray[TABLE_PAGE_ITEMS_NUMBER - 1];
  */
  
  function radioChange(e) {
    setSelectedStatus(e.target.value)
  }
  
  return (
    <Layout 
      style={{
        // height:"calc(100vh - 101px)", 
        padding:"30px"
      }}
    >
      <Space direction="vertical" size="large">
        <Radio.Group 
          optionType="button" 
          value={selectedStatus} 
          onChange={radioChange} 
          size="large"
          // style={{marginTop:"10px"}}
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
