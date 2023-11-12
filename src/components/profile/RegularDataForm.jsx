import { Button, Form, Input, theme } from 'antd';
import React, { useContext, useState } from 'react';
import ApplyOrCancel from '../questionnaire/ApplyOrCancel';
import { signOut } from 'firebase/auth';
import { getProfileFormFields } from '../../models/profile/profile';
import { ProfileContext, ProgramContext } from '../../models/context';
import { library } from '../../lib';
import { auth } from '../../models/firebase';
const { useToken } = theme;

const getRegularDataFormFields = (authorizedUser) => {
  return  [
    {
      name: 'name',
      value: authorizedUser.name,
    },
    {
      name: 'phoneNumber',
      value: authorizedUser.phoneNumber,
    },
  ]
}

const RegularDataForm = ({ name }) => {
  const { authorizedUser } = useContext(ProgramContext)
  const { loading, curEditingForm, setCurEditingForm } = useContext(ProfileContext)
  const fields = getRegularDataFormFields(authorizedUser);
  const [regularFormState, setRegularFormState] = useState(fields)
  const [regularDataFormInstance] = Form.useForm();
  const { token } = useToken();

  const isEditing = curEditingForm === 'regularDataForm';

  const handleValuesChange = (changedValues, _allValues) => {
    setCurEditingForm(name);
    const entries = Object.entries(changedValues)
    setRegularFormState(regularFormState.map(field => {
      if(field.name === entries[0][0]) {
        return {...field, value: entries[0][1]}
      }
      return field;
    }))
  }

  const applyChanges = () => {
    regularDataFormInstance.submit();
  }

  const cancelChanges = () => {
    setCurEditingForm('')
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
        layout='horizontal'
        fields={isEditing ? regularFormState : fields}
        labelCol={{span: 6}}
        wrapperCol={{span: 10}}
        labelAlign='left'
        onValuesChange={handleValuesChange}
        form={regularDataFormInstance}
        disabled={loading && !isEditing}
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
        <ApplyOrCancel
          isEdit={isEditing}
          applyChanges={applyChanges}
          cancelChanges={cancelChanges}
          loading={loading}
        />
      </Form>
    </div>

  );
};

export default RegularDataForm;
