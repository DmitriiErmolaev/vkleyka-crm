import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Layout, Space, Alert} from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../models/firebase";
import { fieldRules } from "../../models/operator/register-validation";

const contentInsideLayoutStyle = {
  flexDirection:"row",
  width:"60%", 
  minHeight:"400px", 
  margin:"100px auto 0", 
  backgroundColor:"#F8F8F8", 
  justifyContent:"center", 
  // alignItems:"center",  
  boxShadow:"3px 3px 6px 2px #0000002c",
}



// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

const AuthForm = () => {
  const [authError, setAuthError] = useState(null)
  
  const onFinish = async ({email, pass:password}) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e)
      if(e.code === "auth/invalid-email" || e.code === "auth/wrong-password") {
        setAuthError("Введен неверный email или пароль")
        return
      }
      if(e.code === "auth/user-not-found") {
        setAuthError("Данный аккаунт не зарегистрирован")
        return
      } 
      if(e.code === "auth/too-many-requests") {
        setAuthError("Доступ к аккаунту временно прекращен. Попробуйте снова через несколько минут")
        return
      }
      setAuthError("Ошибка авторизации")
    }
  };

  const errorIsHidden = authError ? false : true;

  return (
    <Layout style={contentInsideLayoutStyle}>
      <Layout style={{backgroundColor:"inherit",width:"55%", flexGrow:"0", paddingTop:"60px"}}>
        <Form
          colon={false}
          size="large"
          name="login"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          onValuesChange={() => setAuthError(null)}
          autoComplete="off"
        >
          <Form.Item
            label="E-mail"
            name="email"
            rules={fieldRules.email}
          >
            <Input />
          </Form.Item>

          <Form.Item
            // hasFeedback={true}
            colon={true}
            label="Пароль"
            name="pass"
            rules={fieldRules.pass}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Checkbox>
              Запомнить меня
            </Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Space size="large">
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Space>
          </Form.Item>
          <Form.Item
            wrapperCol={{span:24}}
            name="error"
            hidden={errorIsHidden}
          >
            <Alert message={authError} type="error" showIcon />
          </Form.Item>
        </Form>
      </Layout>
    </Layout>
  )
}
export default AuthForm;
