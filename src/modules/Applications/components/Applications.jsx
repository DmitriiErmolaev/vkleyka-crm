import React, {useState, useEffect, useContext} from "react";
import {Layout, Space} from "antd";
import { getCountFromServer } from "firebase/firestore";
import {useCollection, useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";

import { ProgramContext, WorkPageContext } from "../../../models/context.js";
import { getAppsCollRef } from "../../../firebase/applications/getAppsCollRef.js";
import getAllCountriesRef from "../../../firebase/countries/getAllCountriesRef.js";
import { getQueryForAppsWithLimit } from "../firebase/getQueryForAppsWithLimit.js";
import { getQueryForAppsWithoutLimit } from "../firebase/getQueryForAppsWithoutLimit.js";
import { getChatQuery } from "../../../firebase/chat/getChatQuery.js";
import AppsPaginator from '../../../ui/AppsPaginator.jsx';
import AppStatusFilter from "../../../components/new/AppStatusFilter.jsx";
import CountryFilter from "../../../components/new/CountryFilter.jsx";
import AppsTable from '../../../components/new/AppsTable.jsx';
import Error from "../../../components/error/Error.jsx";
import { getFilters } from "../helpers/getFilters.js";
import { getDataForTable } from "../helpers/getData.js";
import { getTableData } from "../helpers/getTableData.js";
import { getAllFieldsFromDocSnapshot } from "../../../helpers/getAllFieldsFromDocSnapshot.js";
import NewApplicationNotificationService from "../../NotificationService/components/NewApplicationNotificationService.jsx";

const ALL_COUNTRIES_REF = getAllCountriesRef();
// const CLIENTS_QUERY = getClientsQuery();
const APPS_REF = getAppsCollRef();

const Applications = () => {
  const {authorizedUser} = useContext(ProgramContext);
  const {appsSearch, pageCount, setPageCount, dialogueForApplication, setSelectedDialogue, clientsData } = useContext(WorkPageContext);
  const [chatsCollSnapshot, chatsLoading, chatsError] = useCollection(getChatQuery());
  const [countriesData, countriesLoading, countriesError, countriesDocSnapshot] = useDocumentData(ALL_COUNTRIES_REF);
  const [selectedCountry, setSelectedCountry] = useState({value:null, label:null});
  const [selectedStatus, setSelectedStatus] = useState('allStatuses');
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [totalAppsCount, setTotalAppsCount] = useState(0);
  const filters = getFilters(selectedCountry, selectedStatus, selectedColumn, authorizedUser, appsSearch);
  const [applicationsData, tableLoading, tableError, appsCollSnapshot] = useCollectionData(getQueryForAppsWithLimit(APPS_REF, filters, pageCount));
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if(applicationsData && countriesData && chatsCollSnapshot) {
      setTableData(getTableData(applicationsData, countriesData.countries, chatsCollSnapshot, appsCollSnapshot, dialogueForApplication, setSelectedDialogue, clientsData));
    }
  }, [applicationsData, countriesData, chatsCollSnapshot, appsCollSnapshot, clientsData, dialogueForApplication])

  useEffect(() => {
    // получаение общего количества возможных заявок
    const getAllAppsCount = async () => {
      const queryForAppsWithoutLimit = getQueryForAppsWithoutLimit(APPS_REF, filters);
      const aggregateSnapshot = await getCountFromServer(queryForAppsWithoutLimit);
      setTotalAppsCount(getAllFieldsFromDocSnapshot(aggregateSnapshot).count);
    }
    getAllAppsCount();
  }, [filters])

  if(tableError || countriesError || chatsError) {
    return <Error error={tableError || countriesError || chatsError}/>
  }

  const radioChange = (e) => {
    setSelectedStatus(e.target.value)
    setPageCount(1)
  }

  const downloadMoreApps = () => {
    setPageCount(prev => ++prev);
  }

  const countries = countriesLoading ? [] : countriesData.countries;

  return (
    <Layout
      style={{
        padding:"30px"
      }}
    >
      <NewApplicationNotificationService applicationsData={applicationsData}/>
      <Space direction="vertical" size="large">
        <AppStatusFilter selectedStatus={selectedStatus} statusChange={radioChange}/>
        <div style={{display:"flex", justifyContent:'space-between'}}>
          <CountryFilter countries={countries} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry}/>
          <AppsPaginator currentAppsCount={tableData.length} totalAppsCount={totalAppsCount} />
        </div>
      </Space>
      <AppsTable
        tableData={tableData}
        setSelectedColumn={setSelectedColumn}
        tableLoading={tableLoading}
        downloadMoreApps={downloadMoreApps}
        totalAppsCount={totalAppsCount}
      />
    </Layout>
  )
}

export default Applications;
