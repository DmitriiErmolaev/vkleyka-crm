import React, {useState, useEffect, useContext} from "react";
import {Layout, Space, Radio, Button, Statistic} from "antd";
import { Timestamp, collection, getCountFromServer, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import {useCollection,useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import TableComponent from "./TableComponent";
import { buttonFilterSettings} from "../../models/status/status";
import { getFilters, getDataForTable, resetBeforeDownloadFilteredData} from "../../models/applications/table-data-processing";
import SelectComponent from "../selectors/SelectComponent";
import Error from "../error/Error";
import {ProgramContext, WorkPageContext} from "../../models/context.js";
import { getClientsQuery } from "../../models/clients/clients";
import {getAppsCollRef} from "../../models/applications/applications"
import {getAllCountriesRef, getCountry} from "../../models/countries/countries"
import {getQueryForAppsWithLimit, getQueryForAppsWithoutLimit} from "../../models/data-processing";
import { getChatQuery } from "../../models/chat/chat-data-processing";
import AppsPaginator from "./AppsPaginator.jsx";
import { firebase, firestore } from "../../models/firebase.js";

const ALL_COUNTRIES_REF = getAllCountriesRef();
// const CLIENTS_QUERY = getClientsQuery();
const APPS_REF = getAppsCollRef();

const AllApplications = () => {
  const {role, authorizedUser} = useContext(ProgramContext);
  const {appsSearch, pageCount, setPageCount } = useContext(WorkPageContext);
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
      setTableData(getDataForTable(applicationsData, countriesData.countries, chatsCollSnapshot, appsCollSnapshot));
    }
  }, [applicationsData, countriesData, chatsCollSnapshot, appsCollSnapshot])

  useEffect(() => {
    // получаение общего количества возможных заявок
    const getAllAppsCount = async () => {
      const queryForAppsWithoutLimit = getQueryForAppsWithoutLimit(APPS_REF, filters);
      const aggregateSnapshot = await getCountFromServer(queryForAppsWithoutLimit);
      setTotalAppsCount(aggregateSnapshot.data().count);
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
        <div style={{display:"flex", justifyContent:'space-between'}}>
          <SelectComponent
            collectionType={"countries"}
            data={{countries, setSelectedCountry, selectedCountry}}
          />
          <AppsPaginator currentAppsCount={tableData.length} totalAppsCount={totalAppsCount} />
        </div>

      </Space>
      <TableComponent
        role = {role}
        tableData={tableData}
        setSelectedColumn={setSelectedColumn}
        currentAppsCount={tableData.length}
        totalAppsCount={totalAppsCount}
      />
      <div style={{display:'flex', justifyContent:'center', marginTop: '1%'}}>
        <Button
          loading={tableLoading}
          onClick={downloadMoreApps}
          disabled={totalAppsCount === tableData.length}
        >
          Загрузить еще
        </Button>
      </div>
    </Layout>
  )
}

export default AllApplications;
