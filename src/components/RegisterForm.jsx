import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Layout} from "antd";
import {auth} from "../firebase"
import {createUserWithEmailAndPassword } from "firebase/auth";

const contentInsideLayoutStyle = {
  width:"60%", 
  minHeight:"400px", 
  margin:"100px auto 0", 
  backgroundColor:"#F8F8F8", 
  justifyContent:"center", 
  alignItems:"center",  
  boxShadow:"3px 3px 6px 2px #0000002c",
}

let user = {};

const RegisterForm = () => {
  // const [value, setValue] = useState("")
  // console.log(Input)
  async function  func({email, pass: password}) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    user = userCredential.user;
    console.log(user)
  }
  return (
    <Layout style={contentInsideLayoutStyle}>
      <Form
        wrapperCol={{lg:{span: 24}}}  
        onFinish = {(values) => func(values)}
        onFinishFailed = {(values) => console.log(values)}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required:true,
              message:"введите e-mail",
            },
            {
              type:"email",
              message:"формат нарушен"
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
            // {
            //   required: true,
            //   message:"обязательно для заполнения"
            // },
            {
              max: 10,
              message:"количество символов должно быть не более 10"
            }
        ]}
        >
          <Input.Password size="large"  placeholder="password"/>
        </Form.Item>
        <Form.Item
         
        >
          <Button type="primary" size="large" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}
export default RegisterForm;
export {user}; 