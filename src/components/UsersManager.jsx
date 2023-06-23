import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Layout, Row, Col, Table, Space, Modal} from "antd";
import {auth} from "../firebase"
import {firestore} from "../firebase.js"
import {createUserWithEmailAndPassword } from "firebase/auth";
import {useCollection } from "react-firebase-hooks/firestore";
import {query, collection,orderBy} from "firebase/firestore";
import {columns} from "../operators-table-config";

const contentInsideLayoutStyle = {
  padding: "0 60px",
}

const collectionPath = {
  operators: "operators",
}

// const

const UsersManager = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const q = query(collection(firestore, collectionPath.operators), orderBy("operatorName"))
  const [collSnapshot, loading, error] = useCollection(q);

  const openRegisterModal = () => {
    setIsModalOpened(true);
  }

  const closeRegisterModal = () => {
    setIsModalOpened(false);
  }

  const handleSubmit = () => {
    closeRegisterModal();
  }
  let array = [];

  if(!loading) {
    collSnapshot.forEach(operatorSnapshot => {
      const data = operatorSnapshot.data();
      array.push(data);
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
        <Table 
          loading="true"
          columns={columns}
          dataSource={array}
        />
      </Space>
      <Modal open={isModalOpened} onCancel={closeRegisterModal} footer={null}>
        <Form
          // wrapperCol={{lg:{span: 20, offset:2} }}  
          onFinish = {handleSubmit}
          onFinishFailed = {(values) => console.log(values)}
        >
          <Form.Item
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
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}
export default UsersManager;

