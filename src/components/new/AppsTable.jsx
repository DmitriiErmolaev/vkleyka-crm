import React, { useContext, useState } from 'react';
import { Button, Table } from "antd";
import { getColumnsConfig } from "../../models/applications/table-columns-config";
import { ProgramContext } from '../../models/context';

const AppsTable = ({tableData, setSelectedColumn, tableLoading, downloadMoreApps, totalAppsCount}) => {
  const { role } = useContext(ProgramContext);
  let columns = getColumnsConfig(role) || [];
  const [columnsSettings, setColumnsSettings] = useState(columns)

  const handleRowClassName = (record, index) => {
    if(record.accountIsDeleted) return 'is-deleted';
  }

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
        rowClassName={handleRowClassName}
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
    </>
  );
};

export default AppsTable;
