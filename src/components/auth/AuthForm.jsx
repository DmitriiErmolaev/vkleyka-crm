import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Layout, Space, Alert} from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../models/firebase";
import { fieldRules } from "../../models/operator/register-validation";
import { AuthErrorCodes } from "firebase/auth";

const contentInsideLayoutStyle = {
  flexDirection:"row",
  width:"60%", 
  minHeight:"400px", 
  margin:"100px auto 0", 
  backgroundColor:"#F8F8F8", 
  justifyContent:"center", 
  boxShadow:"3px 3px 6px 2px #0000002c",
}

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);  // NOTE: для валидации
// };

const AuthForm = () => {
  const [authError, setAuthError] = useState(null)
  const [signInLoading, setSignInLoading] = useState(false)
  
  const onFinish = async ({email, pass:password}) => {
    try {
      setSignInLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e)
      if(e.code === AuthErrorCodes.INVALID_EMAIL || e.code === AuthErrorCodes.INVALID_PASSWORD) {
        setAuthError("Введен неверный email или пароль")
        return
      }
      if(e.code === AuthErrorCodes.USER_DELETED) {
        setAuthError("Данный аккаунт не зарегистрирован")
        return
      } 
      if(e.code === AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        setAuthError("Доступ к аккаунту временно прекращен. Попробуйте снова через несколько минут")
        return
      }
      if(e.code === AuthErrorCodes.NETWORK_REQUEST_FAILED) {
        setAuthError("Отсутствует соединение с интернетом")
        return
      }
      setAuthError("Ошибка авторизации")
    } finally {
      setSignInLoading(false)
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
          // onFinishFailed={onFinishFailed} // NOTE: для пагинации
          onValuesChange={() => setAuthError(null)}
          autoComplete="off"
        >
          <Form.Item
            colon={true}
            label="E-mail"
            name="email"
            rules={fieldRules.email}
          >
            <Input />
          </Form.Item>

          <Form.Item
            colon={true}
            label="Пароль"
            name="pass"
            rules={fieldRules.password}
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
              <Button type="primary" htmlType="submit" loading={signInLoading}>
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
