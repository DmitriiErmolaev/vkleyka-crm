import React from "react";
import { Form, Input, Button, Checkbox, Space, Alert } from "antd";
import { fieldRules } from "../../models/auth/auth-validation-rules";

const AuthForm = ({onFinishInternal, authError, setAuthError, signInLoading}) => {
  const errorIsHidden = authError ? false : true;

  return (
    <Form
      colon={false}
      size="large"
      name="login"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 13,
      }}
      style={{
        width: "100%",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinishInternal}
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
        <Checkbox
          disabled={true}
        >
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
  )
}

export default AuthForm;
