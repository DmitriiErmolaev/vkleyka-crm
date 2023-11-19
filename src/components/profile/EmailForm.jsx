import { Form, Input, theme } from 'antd';
import React, { useContext } from 'react';
import { ProfileContext, ProgramContext } from '../../models/context';
import { library } from '../../lib';
import ApplyOrCancel from '../questionnaire/ApplyOrCancel';
const { useToken } = theme;

const getEmailFormField = (authorizedUser) => {
  return  [
    {
      name: 'email',
      value: authorizedUser.email,
    },
  ]
}

const EmailForm = ({name, emailState, setEmailState}) => {
  const { authorizedUser } = useContext(ProgramContext)
  const { profileUpdating, curEditingForm, setCurEditingForm } = useContext(ProfileContext)
  const fields = getEmailFormField(authorizedUser);
  const [emailFormInstance] = Form.useForm();
  const { token } = useToken();

  const isEditing = curEditingForm === name;

  const applyChanges = () => {
    emailFormInstance.submit();
  }

  const cancelChanges = () => {
    setCurEditingForm('');
    setEmailState();
  }

 

  const handleValuesChange = (changedValues, _allValues) => {
    setCurEditingForm('emailForm')
    const newEmailField = {
      name: 'email',
      value: changedValues.email,
    }
    setEmailState([newEmailField])
  }

  return (
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
        fields={isEditing ? emailState : fields}
        layout='horizontal'
        labelCol={{span: 10}}
            wrapperCol={{span: 14}}
        labelAlign='left'
        onValuesChange={handleValuesChange}
        form={emailFormInstance}
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: library.validationErrorMessages.requiredField }]}
        >
          <Input disabled={(authorizedUser.role !== 'admin') || (profileUpdating && !isEditing)}/>
        </Form.Item>
        <ApplyOrCancel isEdit={isEditing} applyChanges={applyChanges} cancelChanges={cancelChanges} loading={profileUpdating} />
      </Form>
    </div>
  );
};

export default EmailForm;
