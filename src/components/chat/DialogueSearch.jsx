import React, { useContext } from 'react';
import { Input } from 'antd';
import { WorkPageContext } from '../../models/context';
const { Search } = Input;

const DialogueSearch = () => {
  const { searchFilter, setSearchFilters } = useContext(WorkPageContext);

  const handleValueChange = (e) => {
    setSearchFilters(e.target.value);
 }
 
  return (
    <Search
      allowClear
      size={"large"}
      onChange={handleValueChange}
      value={searchFilter}
      style={{
        width: "100%",
      }}
    />
  );
};

export default DialogueSearch;
