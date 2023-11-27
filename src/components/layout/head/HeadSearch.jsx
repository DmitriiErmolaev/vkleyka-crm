import React, { useContext, useState } from 'react';
import { WorkPageContext } from '../../../models/context';
import { Input } from "antd";
import { resetBeforeDownloadFilteredData } from '../../../models/applications/table-data-processing';
const {Search} = Input;

const HeadSearch = () => {
  const {appsSearch, setAppsSearch, setPageCount} = useContext(WorkPageContext);

  const handleSearchChange = (e) => {
    setPageCount(1)
    setAppsSearch(e.target.value)
  }

  return (
    <Search 
      allowClear={true}
      size='large'
      value={appsSearch}
      onChange={handleSearchChange}
    />
  );
};

export default HeadSearch;
