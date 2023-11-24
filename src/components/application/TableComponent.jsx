import React, {useState} from 'react';
import {Statistic, Table} from "antd";
import {getColumnsConfig} from "../../models/applications/table-columns-config";
import AppsPaginator from './AppsPaginator';

//TODO: рефакторинг после завершения пагинации
// const total = (total, range)=>{
//   let first = `${range[0]} - ${range[1]}`
//   let second = ` из ${total}`
//   return first + second;
// }

// const paginationDoc = {
//   // current: 1, // NOTE: для пагинации
//   defaultCurrent: 1,
//   defaultPageSize: 2,
//   position: ["bottomCenter ", "topCenter "],
//   showTotal: total,
// }

const TableComponent = ({
  tableData,
  setSelectedColumn,
  role,
  currentAppsCount,
  totalAppsCount }) => {

  let columns = getColumnsConfig(role) || [];
  const [columnsSettings, setColumnsSettings] = useState(columns)

  function handleTableChange(pagination, filters, sorter, {action}){
    let sortOrder = "asc";
    if(sorter.order === "descend") {
      sortOrder = "desc"
    }
    if (sorter.order === undefined){
      sortOrder = null
    }

    setSelectedColumn({
        column: sorter.columnKey,
        order: sortOrder
    })

    setColumnsSettings(columnsSettings.map(col => {
      if((col.key !== sorter.columnKey) && col.sortOrder) {
        return {...col, sortOrder: undefined}
      }

      if(col.key === sorter.columnKey) {
        return {...col, sortOrder: sorter.order}
      }

      return col
    }))
  }

  return (
    <>
      <Table
        size="small"
        dataSource={tableData}
        columns={columnsSettings}
        pagination={false}
        onChange={handleTableChange}
      />
    </>
    

  );
};

export default TableComponent;
