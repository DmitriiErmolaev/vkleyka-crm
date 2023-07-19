import React from 'react';
import {Layout, Space, Button} from "antd";
const ApplyOrCancel = ({isEdit, applyChanges, cancelChanges }) => {
  
  return isEdit ? (
    <Layout
      style={{
        backgroundColor:"inherit", 
      }}
    >
      <Space size="large">
        <Button type="primary" onClick={applyChanges}>
          Сохранить
        </Button>
        <Button onClick={cancelChanges}>
          Отмена
        </Button>
      </Space>
    </Layout>
  ) : (
    null
  )
};

export default ApplyOrCancel;