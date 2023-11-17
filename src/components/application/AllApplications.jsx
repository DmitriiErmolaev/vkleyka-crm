import React, {useState, useEffect, useContext} from "react";
import {Layout, Space, Radio, Button, Statistic} from "antd";
import { limit, where } from "firebase/firestore";
import {useCollection,useDocument} from "react-firebase-hooks/firestore";
import TableComponent from "./TableComponent";
import { buttonFilterSettings} from "../../models/status/status";
import { getFilters, getDataForTable} from "../../models/applications/table-data-processing";
import { findAuthorizedOperatorName } from "../../models/operator/operators-data-processing";
import SelectComponent from "../selectors/SelectComponent";
import Error from "../error/Error";
import {ProgramContext, WorkPageContext} from "../../models/context.js";
import { getClientsQuery } from "../../models/clients/clients";
import {getAppsCollRef} from "../../models/applications/applications"
import {getAllCountriesRef} from "../../models/countries/countries"
import {getSingleFieldFromDocSnapshot, getDataFromCollSnapshot, getQueryWithConstraints} from "../../models/data-processing";
import { getChatQuery } from "../../models/chat/chat-data-processing";

const ALL_COUNTRIES_REF = getAllCountriesRef();
const CLIENTS_QUERY = getClientsQuery();
const APPS_REF = getAppsCollRef();

// const TABLE_PAGE_ITEMS_NUMBER = 10; // NOTE: Для пагинации

const AllApplications = () => {
  const {role, authorizedUser} = useContext(ProgramContext);
  const {appsSearchFilter} = useContext(WorkPageContext);
  const [chatsCollSnapshot, chatsLoading, chatsError] = useCollection(getChatQuery());
  const [countriesDocSnapshot, countriesLoading, countriesError] = useDocument(ALL_COUNTRIES_REF);
  const [usersCollSnapshot, usersLoading, usersError] = useCollection(CLIENTS_QUERY);
  const [selectedCountry, setSelectedCountry] = useState({value:null, label:null});
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [lastDoc, setLastDoc] = useState();
  const [savedData, setSavedData] = useState([]);
  // const [curTablePage, setCurTablePage] = useState();  // NOTE: Для пагинации
  // const [firstApplicationRef, setFirstApplicationRef] = useState();  // NOTE: Для пагинации
  // const [lastApplicationRef, setLastApplicationRef] = useState();  // NOTE: Для пагинации
  const filters = getFilters(selectedCountry,selectedStatus,selectedColumn, authorizedUser, appsSearchFilter, lastDoc);
  /* TODO: для пагинации: запрос на 10 документов коллекции
  * const queryForAppsWithLimit = query(APPS_REF, ...filters, limit(10));  // NOTE: Для пагинации
  */
  const queryForAppsWithoutLimit = getQueryWithConstraints(APPS_REF, filters);
  const [appsCollSnapshot, tableLoading, tableError] = useCollection(queryForAppsWithoutLimit);
  const [tableDataBeforeChanging, setTableDataBeforeChanging] = useState(null);
  console.log(appsCollSnapshot)
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
  let lastDocSnap = null;

  // let refArray = []; // NOTE: Для пагинации. массив ссылок на документы

  if(!tableLoading && !countriesLoading && !usersLoading && !chatsLoading) {
    if(tableError || countriesError || usersError || chatsError) {
      return <Error error={tableError || countriesError || usersError || chatsError}/>
    } else {
      applications = getDataFromCollSnapshot(appsCollSnapshot);
      const applicants = getDataFromCollSnapshot(usersCollSnapshot);
      countries = getSingleFieldFromDocSnapshot(countriesDocSnapshot, "countries"); // массив объектов-стран
      // arrangedTableData = getDataForTable(applications, applicants, countries, chatsCollSnapshot, appsCollSnapshot);
      arrangedTableData = getDataForTable(applications, applicants, countries, chatsCollSnapshot, appsCollSnapshot, savedData);
      lastDocSnap = appsCollSnapshot.docs[appsCollSnapshot.docs.length - 1];
      // refArray = getDocsRefs(appsCollSnapshot);  NOTE: Для пагинации
    }
  }

  const radioChange = (e) => {
    setSelectedStatus(e.target.value)
  }

  const downloadMoreApps = () => {
    setLastDoc(lastDocSnap)
    setSavedData(arrangedTableData)
  }

  /* TODO: для пагинации: запоминание ссылки на 1 и 10 документы
  * let firstDocRef = refArray[0];  // NOTE: Для пагинации
  * let lastDocRef = refArray[TABLE_PAGE_ITEMS_NUMBER - 1];
  */

  return (
    <Layout 
      style={{
        padding:"30px"
      }}
    >
      <Space direction="vertical" size="large">
        <div style={{display:'flex', justifyContent:'space-between'}}>
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
          <div style={{padding:'0.5% 2%', borderRadius:'12px',boxShadow:'0 0 6px #00000045'}}>
            <Statistic title="Всего заявок" value={arrangedTableData.length} />
          </div>
        </div>
        

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
      <div style={{display:'flex', justifyContent:'center'}}>
        <Button
          loading={tableLoading}
          onClick={downloadMoreApps}
        >
          ...Загрузить еще
        </Button>
      </div>
    </Layout>
  )
}

export default AllApplications;
