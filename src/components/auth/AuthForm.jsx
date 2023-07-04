import React from "react";
import {useNavigate} from "react-router-dom";
import {Form, Input, Button, Checkbox, Layout, Space} from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../models/firebase";

const contentInsideLayoutStyle = {
  width:"60%", 
  minHeight:"400px", 
  margin:"100px auto 0", 
  backgroundColor:"#F8F8F8", 
  justifyContent:"center", 
  alignItems:"center",  
  boxShadow:"3px 3px 6px 2px #0000002c",
}

const onFinish = async ({email,pass:password}) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

const AuthForm = () => {
  const navigate = useNavigate()

  return (
    <Layout style={contentInsideLayoutStyle}>
      <Form
        colon={false}
        size="large"
        name="login"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          width: "100%",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
            {
              type: "email",
              message: "неверный формат"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          // hasFeedback={true}
          colon={true}
          label="password"
          name="pass"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Space size="large">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="primary" onClick={()=> navigate("/login/register")}>
              Register
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Layout>
  )
}
export default AuthForm;
