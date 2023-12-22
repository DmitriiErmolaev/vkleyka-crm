import React from 'react';
import {Form, Input, Button, Layout,  Alert} from "antd";
import {fieldRules} from "../../models/operator/register-validation.js";

// const initialFeedbackStatus = {
//   name: "validating",
//   surname: "validating",
//   tel: "validating",           // для управляемой сигнализации валидации
//   phone: "validating",
//   email: "validating",
//   pass: "validating",
//   confirm: "validating",
// }

const NewOperatorForm = ({buttonLoadingState, errorMessage, errorMessageHidden, handleValuesChange, handleSubmitFail, handleSubmit, form}) => {
  // const [feedBackStatus, setFeedbackStatus] = useState(initialFeedbackStatus) // для управляемой сигнализации валидации поля. Пока не разобрался.

  return (
    <Layout style={{margin:"15px", backgroundColor:"inherit"}}>
      <Form
        form = {form}
        onFinish = {handleSubmit}
        onFinishFailed = {handleSubmitFail}
        onValuesChange = {handleValuesChange}
        autoComplete="off"
      >
        <Form.Item
          hasFeedback="true"
          name="name"
          rules={fieldRules.operatorName}
          validateTrigger={["onChange", "onSubmit"]}
        >
          <Input
            size="large"
            placeholder="Имя"
            allowClear="true"
          >
          </Input>
        </Form.Item>
        <Form.Item
          hasFeedback="true"
          name="surname"
          rules={fieldRules.surname}
          validateTrigger={["onChange", "onSubmit"]}
        >
          <Input
            size="large"
            placeholder="Фамилия"
            allowClear="true"
          >
          </Input>
        </Form.Item>
        <Form.Item
          hasFeedback="true"
          name="tel"
          validateTrigger={["onChange","onSubmit", ]}
          rules={fieldRules.tel}
        >
          <Input
            size="large"
            placeholder="Номер телефона с кодом страны (+123456789)"
            allowClear="true"
            autoComplete='off'
          />
        </Form.Item>
        <Form.Item
          hasFeedback="true"
          name="email"
          rules={fieldRules.email}
          validateTrigger={["onChange", "onSubmit"]}
        >
          <Input
            size="large"
            allowClear
            placeholder="e-mail"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          hasFeedback="true"
          name="pass"
          validateTrigger={["onChange", "onBlur"]}
          rules={fieldRules.password}
        >
          <Input.Password size="large"  placeholder="password" autoComplete='off'/>
        </Form.Item>
        <Form.Item
          hasFeedback="true"
          name="confirm"
          dependencies={["pass"]}
          rules={fieldRules.passConfirm}
          validateTrigger={["onChange", "onSubmit"]}
        >
          <Input.Password size="large"  placeholder="Повторите пароль" autoComplete='off'/>
        </Form.Item>
        <Form.Item
          wrapperCol={{offset:8}}
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={buttonLoadingState}
          >
            Создать аккаунт
          </Button>
        </Form.Item>
        <Form.Item
          hidden={errorMessageHidden}
        >
          <Alert
            type="error"
            message={errorMessage}
            showIcon
          />
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default NewOperatorForm;
