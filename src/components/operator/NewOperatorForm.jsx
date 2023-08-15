import React, {useState, useEffect, useContext} from 'react';
import {Form, Input, Button, Layout,  Alert} from "antd";
import {fieldRules} from "../../models/operator/register-validation.js";
import { createNewUser } from '../../models/operator/operators-data-processing.js';
import { ProgramContext} from '../../models/context.js';
import { AuthErrorCodes } from 'firebase/auth';
import { openNotification } from '../../models/notification/notification.js';
// const initialFeedbackStatus = {
//   name: "validating", 
//   surname: "validating",
//   tel: "validating",           // для управляемой сигнализации валидации
//   phone: "validating", 
//   email: "validating",
//   pass: "validating",
//   confirm: "validating",
// }

const NewOperatorForm = ({closeRegisterModal, isFormCancelled, setIsFormCancelled}) => {
  const [errorMessage, setErrorMessage] = useState("Error!")
  const [form] = Form.useForm();
  // const [feedBackStatus, setFeedbackStatus] = useState(initialFeedbackStatus) // для управляемой сигнализации валидации поля. Пока не разобрался.
  const [buttonLoadingState, setButtonLoadingState] = useState(false);
  const [errorMessageHidden, setErrorMessageHidden] = useState(true);
  const {admins, notificationApi} = useContext(ProgramContext)

  function resetFormFileds() {
    form.resetFields();
  }

  useEffect(()=> {
    if(isFormCancelled) {
      resetFormFileds();
      setErrorMessageHidden(true)
      setIsFormCancelled(false);
    }
  },[])

  const handleSubmit = async (values) => {
    try {
      setButtonLoadingState(true);
      await createNewUser(values, admins)
      setButtonLoadingState(false);
      openNotification(notificationApi, "success", "createNewOperator")
      closeRegisterModal();
      resetFormFileds();
    } catch(e) {
      console.log(e)
      if(e.code === AuthErrorCodes.EMAIL_EXISTS) {
        setErrorMessage('Введенный email уже зарегистрирован!')
      } else {
        setErrorMessage(e.message)
      }
      setErrorMessageHidden(false)
      setButtonLoadingState(false);
    } 
  }

  const handleSubmitFail = (_values, _errorFields, _outOfDate) => {
    setErrorMessage("Введены неверные данные. Пожалуйста проверьте корректность данных!")
    setErrorMessageHidden(false)
  }

  const handleValuesChange = () => {
    setErrorMessageHidden(true)  
  }
  
  return (
    <Layout style={{margin:"15px", backgroundColor:"inherit"}}>
      <Form
        form = {form}
        onFinish = {handleSubmit}
        onFinishFailed = {handleSubmitFail}
        onValuesChange= {handleValuesChange}
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
          >
          </Input>
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
          placeholder="e-mail"/>
        </Form.Item>
        <Form.Item 
          hasFeedback="true"
          name="pass"
          validateTrigger={["onChange", "onBlur"]}
          rules={fieldRules.password}
        >
          <Input.Password size="large"  placeholder="password"/>
        </Form.Item>
        <Form.Item 
          hasFeedback="true"
          name="confirm"
          dependencies={["pass"]}
          rules={fieldRules.passConfirm}
          validateTrigger={["onChange", "onSubmit"]}
        >
          <Input.Password size="large"  placeholder="Повторите пароль"/>
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
