import React, {useState, useContext} from "react";
import { Button,  Layout, Row, Col, Table, Space} from "antd";
import {columns} from "../../models/operator/operators-table-config";
import {ProgramContext} from "../../models/context.js";
import { getOnlyOperators } from "../../models/operator/operators-data-processing";
import Popup from "./Popup";

const contentInsideLayoutStyle = {
  padding: "0 60px",
}

const Operators = () => {
  const {admins} = useContext(ProgramContext);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeRegisterModal = () => {
    setIsModalOpened(false);
  }

  const openRegisterModal = () => {
    setIsModalOpened(true);
  }
  
  const onlyOperators = getOnlyOperators(admins);

  return (
    <Layout 
      style={contentInsideLayoutStyle}
    >
      <Space direction="vertical">
        <Row justify="end">
          <Col >
            <Button type="primary" block="false" onClick={openRegisterModal}>Новый визовик</Button>
          </Col>
        </Row>
        <Table 
          // loading={<Spin size="large"></Spin>} // NOTE; для спиннера загрузки
          columns={columns}
          dataSource={onlyOperators}
          rowKey="id"
        />
      </Space>
      <Popup 
        isModalOpened={isModalOpened} 
        closeRegisterModal={closeRegisterModal} 
      />
    </Layout>
  )
}

export default Operators;
