import React, {useState, useEffect} from "react";
import {Form, Input, Button, Checkbox, Layout, Row, Col, Table, Space, Modal, Alert, useForm, Spin} from "antd";
import {useDocument} from "react-firebase-hooks/firestore";
import {columns} from "../../models/operator/operators-table-config";
import {AdminsContext} from "../../models/context.js";
import {getAdminsRef} from "../../models/operator/operators";
import {createNewOperator} from "../../models/operator/operators-data-processing";
import {getSingleFieldFromDocSnapshot} from "../../models/data-processing";
import Popup from "./Popup";

const ADMINS_REF = getAdminsRef();

const contentInsideLayoutStyle = {
  padding: "0 60px",
}

const Operators = () => {
  const [adminsState, setAdminsState] = useState([]);
  const [successMessageHidden, setSuccessMessageHidden] = useState(true);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const [adminsDocSnapshot, adminsLoading, adminsError] = useDocument(ADMINS_REF);

  useEffect(() => {
    if(adminsData.length !== 0) {
      setAdminsState(adminsData);
    }
  },[adminsDocSnapshot])
          
  // const hideNotification = () => {
  //   if(!successMessageHidden) {
  //     setSuccessMessageHidden(true);
  //   } 

  //   if(!errorMessageHidden) {
  //     setErrorMessageHidden(true);
  //   }
  // }

  // const handleValuesChange = () => {
  //   hideNotification();
  // }

  const closeRegisterModal = () => {
    setIsModalOpened(false);
  }

  const openRegisterModal = () => {
    setIsModalOpened(true);
  }
      
  let adminsData = [];

  if(!adminsLoading) {
    adminsData = getSingleFieldFromDocSnapshot(adminsDocSnapshot, "admins");
  }

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
        <AdminsContext.Provider value={adminsState}>
          <Table 
            // loading={<Spin size="large"></Spin>}
            columns={columns}
            dataSource={adminsState}
          />
        </AdminsContext.Provider>
      </Space>
      <Popup isModalOpened={isModalOpened} closeRegisterModal={closeRegisterModal} adminsState={adminsState}/>
    </Layout>
  )
}

export default Operators;
