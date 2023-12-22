import React, {useState, useContext} from "react";
import { Button,  Layout, Row, Col, Table, Space} from "antd";
import { columns } from "../../models/operator/operators-table-config.jsx";
import { OperatorsContext, ProgramContext } from "../../models/context.js";
import { getOnlyOperators } from "../../models/operator/operators-data-processing";
import Popup from "./Popup";

const contentInsideLayoutStyle = {
  padding: "0 60px",
}

const Operators = () => {
  const [ actionType, setActionType ] = useState(null)
  const [ deletingOperatorId, setDeletingOperatorId ] = useState(null);
  const [ deletingOperatorName, setDeletingOperatorName ] = useState(null);
  const [ popupIsOpened, setPopupIsOpened ] = useState(false);
  const { admins } = useContext(ProgramContext);

  const openPopupToCreateNewOperator = () => {
    setActionType('createOperator');
    setPopupIsOpened(true);
  }

  const onlyOperators = getOnlyOperators(admins);

  return (
    <OperatorsContext.Provider value={{actionType, setActionType, deletingOperatorId, setDeletingOperatorId, deletingOperatorName, setDeletingOperatorName, popupIsOpened, setPopupIsOpened}}>
      <Layout
        style={contentInsideLayoutStyle}
      >
        <Space direction="vertical">
          <Row justify="end">
            <Col >
              <Button type="primary" block="false" onClick={openPopupToCreateNewOperator}>Новый визовик</Button>
            </Col>
          </Row>
          <Table
            // loading={<Spin size="large"></Spin>} // NOTE; для спиннера загрузки
            columns={columns}
            dataSource={onlyOperators}
            rowKey="id"
          />
        </Space>
        <Popup />
      </Layout>
    </OperatorsContext.Provider>
  )
}

export default Operators;
