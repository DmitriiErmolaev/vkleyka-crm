import React, { useContext, useEffect, useState } from 'react';
import { OperatorsContext, ProgramContext } from '../../../models/context.js';
import { Form } from 'antd';
import NewOperatorForm from './NewOperatorForm.jsx';
import { createNewUser } from '../firebase/createNewUser.js';
import { AuthErrorCodes } from 'firebase/auth';
import { openNotification } from '../../../models/notification/notification.js';
import showNotification from '../../NotificationService/helpers/showNotification.js';

const NewOperator = () => {
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ form ] = Form.useForm();
  const [ buttonLoadingState, setButtonLoadingState ] = useState(false);
  const [ errorMessageHidden, setErrorMessageHidden ] = useState(true);
  const { admins, notificationAPI } = useContext(ProgramContext)
  const { setActionType, popupIsOpened, setPopupIsOpened } = useContext(OperatorsContext)

  useEffect(()=> {
    // очистить все стейты и форму при закрытии попапа
    if(!popupIsOpened) {
      form.resetFields();
      setErrorMessageHidden(true);
      setErrorMessage('')
      setActionType(null);
    }
  },[popupIsOpened, form])

  const handleSubmit = async (values) => {
    try {
      setButtonLoadingState(true);
      await createNewUser(values, admins)
      setButtonLoadingState(false);
      // openNotification(notificationAPI, "success", "createNewOperator");
      showNotification(notificationAPI, 'process', {processName: 'createNewOperator', status: 'success',})

      setPopupIsOpened(false);
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
    <NewOperatorForm
      buttonLoadingState={buttonLoadingState}
      errorMessage={errorMessage}
      errorMessageHidden={errorMessageHidden }
      handleValuesChange={handleValuesChange}
      handleSubmitFail={handleSubmitFail}
      handleSubmit={handleSubmit}
      form={form}
    />
  );
};

export default NewOperator;
