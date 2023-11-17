import React, {useState} from 'react';
import {Statistic, Table} from "antd";
import {getColumnsConfig} from "../../models/applications/table-columns-config";

//TODO: рефакторинг после завершения пагинации
const total = (total, range)=>{
  let first = `${range[0]} - ${range[1]}`
  let second = ` из ${total}`
  return first + second;
}

const paginationDoc = {
  // current: 1, // NOTE: для пагинации
  defaultCurrent: 1,
  defaultPageSize: 2, 
  position: ["bottomCenter ", "topCenter "],
  showTotal: total,
}

const TableComponent = ({
  // firstDocRef, 
  // lastDocRef,
  // setFirstApplicationRef, // NOTE: для пагинации
  // setLastApplicationRef, 
  // setCurTablePage,
  tableLoading, 
  arrangedTableData, 
  setSelectedColumn, 
  tableDataBeforeChanging, 
  role,
}) => {

  let columns = getColumnsConfig(role) || [];
    
  const [columnsSettings, setColumnsSettings] = useState(columns)
  const [paginationSettings, setPaginationSettings] = useState(paginationDoc)
  // const [totalApps, setTotalApps] = useState(); // NOTE: для пагинации

  // useEffect(()=>{
  //   getTotalApps() // NOTE: для пагинации
  // },[])

  // const getTotalApps = async () => {
  //   const aggregSnapshot = await getCountFromServer(queryForAppsWithoutLimit);
  //   setPaginationSettings({...paginationSettings, "total": aggregSnapshot.data().count}); // NOTE: для пагинации
  //   console.log(aggregSnapshot.data()) 
  // }

  function handleTableChange(pagination, filters, sorter, {action}){
    if(action === "paginate") {
      // TODO: для пагинации.
      // setCurTablePage(pagination.current) // NOTE: для пагинации
      // setFirstApplicationRef(dirstDocRef)
      // setLastApplicationRef(lastDocRef)
    } else {
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
  }

  if (tableLoading) {
    return (
      <Table 
        size="small"
        loading
        dataSource={tableDataBeforeChanging} 
        columns={columnsSettings} 
        // pagination={paginationSettings} 
        pagination={false}
        onChange={handleTableChange} 
      />
    )
  }

  return (
    <>
      <Table
        size="small"
        dataSource={arrangedTableData} 
        columns={columnsSettings} 
        pagination={false}
        // pagination={paginationSettings} 
        onChange={handleTableChange} 
      />
    </>
    
  );
};

export default TableComponent;
