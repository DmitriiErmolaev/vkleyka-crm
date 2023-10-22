import { Form, Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { ProgramContext } from '../../models/context';
import { getProfileFormFields, updateOperatorProfile } from '../../models/profile/profile';
import ApplyOrCancel from '../questionnaire/ApplyOrCancel';
import { openNotification } from '../../models/notification/notification';
import { library } from '../../lib';

const ProfileForm = () => {
  const [isEdit, setIsEdit] = useState(false)
  const {authorizedUser, notificationApi, admins} = useContext(ProgramContext)
  const fields = getProfileFormFields(authorizedUser);
  const [form] = Form.useForm();
  const [formState, setFormState] = useState(fields)
  const [dataLoading, setDataLoading] = useState(false)

  const applyChanges = () => {
    form.submit();
  }

  const cancelChanges = () => {
    setIsEdit(false);
  }

  const handleValuesChange = (changedValues, allValues) => {
    const entries = Object.entries(changedValues)
    setFormState(formState.map(field => {
      if(field.name === entries[0][0]) {
        return {...field, value: entries[0][1]}
      }
      return field
    }))
    if (!isEdit) {
      setIsEdit(true);
    } 
  }

  const handleFinish = async () => {
    try {
      setDataLoading(true)
      await updateOperatorProfile(authorizedUser, admins, formState)
    } catch (e) {
      console.log(e);
      openNotification(notificationApi, 'error', 'updateAdmin')
    } finally {
      setDataLoading(false)
      setIsEdit(false);
      openNotification(notificationApi, 'success', 'updateAdmin')
    }
  }
  
  return (
    <div className='profile__apdate-form' style={{marginTop:'5%'}}>
      <Form
        layout='horizontal'
        fields={isEdit ? formState : fields}
        labelCol={{span: 6}}
        wrapperCol={{span: 10}}
        labelAlign='left'
        onValuesChange={handleValuesChange}
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          name='name'
          label='Имя'
          rules={[{ required: true, message: library.validationErrorMessages.requiredField }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='phoneNumber'
          label='Телефон'
          rules={[{ required: true, message: library.validationErrorMessages.requiredField }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: library.validationErrorMessages.requiredField }]}
        >
          <Input />
        </Form.Item>
        <ApplyOrCancel isEdit={isEdit} applyChanges={applyChanges} cancelChanges={cancelChanges} loading={dataLoading} />
      </Form>
    </div>
  )
};

export default ProfileForm;
