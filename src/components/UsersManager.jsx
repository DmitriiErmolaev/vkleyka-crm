import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Layout, Row, Col, Table, Space, Modal, Alert, useForm} from "antd";
import {auth} from "../firebase"
import {firestore} from "../firebase.js"
import {beforeAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import {useCollection } from "react-firebase-hooks/firestore";
import {query, collection,orderBy, addDoc, doc} from "firebase/firestore";
import {columns} from "../operators-table-config";
import {OperatorsFirestoreDocRefs} from "../context.js";

const contentInsideLayoutStyle = {
  padding: "0 60px",
}

const collectionPath = {
  operators: "operators",
}

const operatorsCollRef = collection(firestore, collectionPath.operators )

const UsersManager = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [successMessageHidden, setSuccessMessageHidden] = useState(true)
  const [errorMessageHidden, setErrorMessageHidden] = useState(true)
  const q = query(operatorsCollRef, orderBy("operatorName"))
  const [collSnapshot, loading, error] = useCollection(q);
  const [buttonLoadingState, setButtonLoadingState] = useState(false);
  const [form] = Form.useForm()

  const openRegisterModal = () => {
    setIsModalOpened(true);
  }

  const closeRegisterModal = () => {
    setIsModalOpened(false);
    form.resetFields();
    setSuccessMessageHidden(true);
    setErrorMessageHidden(true);
  }

  const handleSubmitFail = (values) => {
    setErrorMessageHidden(false)
  }
  const handleValuesChange = () => {
    setSuccessMessageHidden(true);
    setErrorMessageHidden(true);
  }

  const handleSubmit = async (values) => {
    setButtonLoadingState(true)
    await addDoc(operatorsCollRef, {
      id: 5,
      operatorName:`${values.name} ${values.surname}`,
      phoneNumber:values.tel,
      appCompleted: 0,
    });
    setButtonLoadingState(false)

    setSuccessMessageHidden(false)
  }

  let dataArray = [];
  let docRefsArray = [];

  if(!loading) {
    collSnapshot.forEach(operatorSnapshot => {
      docRefsArray.push(operatorSnapshot.ref);
      dataArray.push(operatorSnapshot.data());
    })
  }
  // async function  func({email, pass: password}) {
  //   const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  //   user = userCredential.user;
  //   console.log(user)
  // }

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
        <OperatorsFirestoreDocRefs.Provider value={docRefsArray}>
          <Table 
            loading="true"
            columns={columns}
            dataSource={dataArray}
          />
        </OperatorsFirestoreDocRefs.Provider>
      </Space>
      <Modal 
        open={isModalOpened} 
        onCancel={closeRegisterModal} 
        footer={null}
        maskStyle={{backgroundColor:"#0000009C"}}
        width="38%"
        // onOk={handleOk}
      >
        <Form
          form={form}
          // preserve={false}  // чтобы форма очищалась после закрытия модального окна.
          onFinish = {handleSubmit}
          onFinishFailed = {handleSubmitFail}
          onValuesChange= {handleValuesChange}
        >
          <Form.Item
            preserve="false"
            name="name"
            rules={[
              {
                required: true,
                message:"Введите имя"
              },
            ]}
          >
            <Input
              size="large" 
              placeholder="Имя"
              allowClear="true"
            >
            </Input>
          </Form.Item>
          <Form.Item
            preserve="false"
            name="surname"
            rules={[
              {
                required: true,
                message:"Введите фамилию"
              },
            ]}
          >
            <Input
              size="large" 
              placeholder="Фамилия"
              allowClear="true"
            >
            </Input>
          </Form.Item>
          <Form.Item
            preserve="false"
            name="tel"
            rules={[
              {
                required: true,
                message:"Введите номер телефона"
              },
            ]}
          >
            <Input
              size="large" 
              placeholder="Телефон"
              allowClear="true"
            >
            </Input>
          </Form.Item>
          <Form.Item
            preserve="false"
            name="email"
            rules={[
              {
                required:true,
                message:"введите E-mail адрес",
              },
              {
                type:"email",
                message:"неверный E-mail адрес"
              }
            ]}
          >
            <Input
            // value={value} 
            // onChange={(e)=> setValue(e.target.value)} 
            size="large" 
            allowClear  
            placeholder="e-mail"/>
          </Form.Item>
          <Form.Item 
            preserve="false"
            name="pass"
            rules={[
              {
                required: true,
                message:"введите пароль"
              },
              {
                max: 10,
                message:"количество символов должно быть не более 10"
              }
          ]}
          >
            <Input.Password size="large"  placeholder="password"/>
          </Form.Item>
          <Form.Item 
            preserve="false"
            name="pass"
            rules={[
              {
                required: true,
                message:"введите пароль"
              },
              {
                max: 10,
                message:"количество символов должно быть не более 10"
              }
          ]}
          >
            <Input.Password size="large"  placeholder="confirm password"/>
          </Form.Item>
          <Form.Item
            wrapperCol={{offset:8}}
            preserve="false">
            <Button type="primary" size="large" htmlType="submit" loading={buttonLoadingState}>
              Создать аккаунт
            </Button>
          </Form.Item>
          <Form.Item
            hidden={successMessageHidden}
          >
            <Alert type="success" message="Success!" showIcon /> 
          </Form.Item>
          <Form.Item
            hidden={errorMessageHidden}
            preserve="false"

          >
            <Alert type="error" message="Failed!" showIcon /> 
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default UsersManager;

