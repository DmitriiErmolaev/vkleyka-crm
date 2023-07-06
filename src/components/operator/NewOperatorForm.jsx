import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Layout,  Alert, useForm, Spin} from "antd";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {fieldRules} from "../../models/operator/field-validation-rules.js";
import {createDbOperatorObject} from "../../models/operator/operators-data-processing.js"
import {auth} from "../../models/firebase";
import { getAdminsRef } from '../../models/operator/operators.js';
import { beforeAuthStateChanged } from 'firebase/auth';
import { createNewUser } from '../../models/operator/operators-data-processing.js';

const ADMINS_REF = getAdminsRef();  

const NewOperatorForm = ({closeRegisterModal, adminsData, isFormCancelled, setIsFormCancelled}) => {
  console.log(adminsData)
  const [form] = Form.useForm();
  const [buttonLoadingState, setButtonLoadingState] = useState(false);
  const [errorMessageHidden, setErrorMessageHidden] = useState(true);

  const resetFormFileds = () => {
    form.resetFields();
  }

  useEffect(()=> {
    if(isFormCancelled) {
      resetFormFileds();
      setIsFormCancelled(false);
    }
  })

  const handleSubmit = async (values) => {
    try {
      setButtonLoadingState(true);
      await createNewUser( values, adminsData)
      // createDbOperatorObject(adminsData, ADMINS_REF, values, newUser.uid)
    } catch(er) {
      console.log(er) 
    } finally {
      setButtonLoadingState(false);
      closeRegisterModal();
      resetFormFileds();
    }
    
  }

  const handleSubmitFail = (values, errorFields, outOfDate) => {
    console.log(values, errorFields, outOfDate)
    setErrorMessageHidden(false)
  }

  const handleValuesChange = () => {
    setErrorMessageHidden(true)  
  }
  
  return (
    <Layout style={{margin:"15px", backgroundColor:"inherit"}}>
      <Form
        form={form}
        onFinish = {handleSubmit}
        onFinishFailed = {handleSubmitFail}
        onValuesChange= {handleValuesChange}
      >
        <Form.Item
          hasFeedback="true"
          name="name"
          rules={fieldRules.operatorName}
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
          validateTrigger={["onChange","onBlur"]}
          rules={fieldRules.tel}
        >
          <Input
            size="large" 
            placeholder="Номер телефона с кодом страны"
            allowClear="true"
          >
          </Input>
        </Form.Item>
        <Form.Item
          hasFeedback="true"
          name="email"
          rules={fieldRules.email}
        >
          <Input
          size="large" 
          allowClear  
          placeholder="e-mail"/>
        </Form.Item>
        <Form.Item 
          hasFeedback="true"
          name="pass"
          validateTrigger={["onChange", "onBlur", "onSubmit"]}
          rules={fieldRules.password}
        >
          <Input.Password size="large"  placeholder="password"/>
        </Form.Item>
        <Form.Item 
          hasFeedback="true"
          name="confirm"
          dependencies={["pass"]}
          rules={fieldRules.passConfirm}
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
            message="Введены неверные данные. Пожалуйста проверьте корректность данных!" 
            showIcon 
          /> 
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default NewOperatorForm;