import { Button, Form, Input, theme } from 'antd';
import React, { useContext } from 'react';
import { ProfileContext, ProgramContext } from '../../models/context';
import ApplyOrCancel from '../questionnaire/ApplyOrCancel';
import { library } from '../../lib';
const { useToken } = theme;


const PasswordForm = ({name, passwordState, setPasswordState}) => {
  const { authorizedUser } = useContext(ProgramContext)
  const { profileUpdating, curEditingForm, setCurEditingForm } = useContext(ProfileContext)
  const [passwordFormInstance] = Form.useForm();
  const { token } = useToken();

  const isEditing = curEditingForm === name;

  const applyChanges = () => {
    passwordFormInstance.submit();
  }

  const cancelChanges = () => {
    setCurEditingForm('');
    setPasswordState([{name: 'pass', value: ''}, {name: 'confirm', value: ''}]);
  }

  const handleChangePassword = () => {
    setCurEditingForm(name);
  }

  const handleValuesChange = (_changedValues, allValues) => {
    const entries = Object.entries(allValues);
    const newFields = entries.map(entry => ({name:entry[0], value: entry[1]}))
    setCurEditingForm('passwordForm');
    setPasswordState(newFields)
  }

  return (
    <div>
      {isEditing ? (
        <div
          style={{
            backgroundColor: token.colorBgContainer,
            padding: '5% 5% 2.5%',
            borderRadius: '10px',
            marginBottom: '5%',
          }}
        >
          <Form
            name={name}
            fields={passwordState}
            layout='horizontal'
            labelCol={{span: 10}}
            wrapperCol={{span: 14}}
            labelAlign='left'
            onValuesChange={handleValuesChange}
            form={passwordFormInstance}
          >
            <Form.Item
              name='pass'
              label='Пароль'
              rules={[{ required: true, message: library.validationErrorMessages.requiredField }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='confirm'
              label='Повторите пароль'
              rules={[{ required: true, message: library.validationErrorMessages.requiredField }]}
            >
              <Input />
            </Form.Item>
            <ApplyOrCancel
              isEdit={isEditing}
              applyChanges={applyChanges}
              cancelChanges={cancelChanges}
              loading={profileUpdating}
            />
          </Form>
        </div>
      ) : (
        <div style={{width:'fit-content', marginLeft:'auto'}} >
          <Button type='link' onClick={handleChangePassword}>Изменить пароль</Button>
        </div>
      )}
    </div>
  );
};

export default PasswordForm;
