import React, {useState} from 'react';
import { Input } from 'antd';
const { Search } = Input;

const DialogueSearch = ({setSearchFilters}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setSearchFilters(e.target.value);
  }
  const handleSearch = (value, event) => {
    //NOTE: аргументом передается  value, т.е. свой стейт можно теоретически убрать
  }

  return (
    <Search
      allowClear
      size={"large"}
      // onSearch={}
      onChange={handleSearchChange}
      value={searchText}
      style={{
        width: "100%",
      }}
    />
  );
};

export default DialogueSearch;