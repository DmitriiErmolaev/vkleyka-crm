import React from "react";
import {Form, Input, Button, Checkbox, Layout} from "antd";

const contentInsideLayoutStyle = {
  width:"60%", 
  minHeight:"400px", 
  margin:"100px auto 0", 
  backgroundColor:"#F8F8F8", 
  justifyContent:"center", 
  alignItems:"center",  
  boxShadow:"3px 3px 6px 2px #0000002c",
}

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const AuthForm = () => {

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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          // hasFeedback={true}
          colon={true}
          label="Password"
          name="password"
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}
export default AuthForm;