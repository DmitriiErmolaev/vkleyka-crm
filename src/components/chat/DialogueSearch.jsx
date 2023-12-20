import React, { useContext } from 'react';
import { Input } from 'antd';
import { WorkPageContext } from '../../models/context';
const { Search } = Input;

const DialogueSearch = () => {
  const { chatsSearchFilter, setChatsSearchFilter } = useContext(WorkPageContext);

  const handleValueChange = (e) => {
    setChatsSearchFilter(e.target.value);
 }
 
  return (
    <Search
      allowClear
      size={"large"}
      onChange={handleValueChange}
      value={chatsSearchFilter}
      style={{
        width: "100%",
      }}
    />
  );
};

export default DialogueSearch;
