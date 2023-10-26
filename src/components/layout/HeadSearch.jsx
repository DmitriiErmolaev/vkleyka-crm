import React, { useContext, useState } from 'react';
import { WorkPageContext } from '../../models/context';
import { Input } from "antd";
const {Search} = Input;

const HeadSearch = () => {
  const {appSearchFilter, setAppsSearchFilter} = useContext(WorkPageContext);

  const handleSearchChange = (e) => {
    setAppsSearchFilter(e.target.value)
  }

  return (
    <Search 
      allowClear={true} 
      size='large'
      value={appSearchFilter}
      onChange={handleSearchChange}
    />
  );
};

export default HeadSearch;
