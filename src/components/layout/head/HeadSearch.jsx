import React, { useContext } from 'react';
import { WorkPageContext } from '../../../models/context';
import { Input } from "antd";
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
