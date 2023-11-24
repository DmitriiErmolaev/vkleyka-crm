import React, { useContext, useState } from 'react';
import { WorkPageContext } from '../../../models/context';
import { Input } from "antd";
import { resetBeforeDownloadFilteredData } from '../../../models/applications/table-data-processing';
const {Search} = Input;

const HeadSearch = () => {
  const {appsSearch, setAppsSearch, setTableData, lastDoc, setLastDoc} = useContext(WorkPageContext);

  const handleSearchChange = (e) => {
    if(e.target.value) {
      resetBeforeDownloadFilteredData(lastDoc, setLastDoc, setTableData)
      if(!appsSearch.mode) setAppsSearch(prev => ({...prev, mode: true}));
    } else {
      if(appsSearch.mode) setAppsSearch(prev => ({...prev, mode: false}));
    }
    setAppsSearch(prev => ({...prev, text: e.target.value}))
  }

  return (
    <Search 
      allowClear={true} 
      size='large'
      value={appsSearch.text}
      onChange={handleSearchChange}
    />
  );
};

export default HeadSearch;
