import { Form, Input, theme } from 'antd';
import React, { useContext, useState } from 'react';
import ApplyOrCancel from '../../../components/new/ApplyOrCancel';
import { ProfileContext, ProgramContext } from '../../../models/context';
import { library } from '../../../lib';
import { getRegularDataFormFields } from '../helpers/getRegularDataFormFields';
const { useToken } = theme;

const RegularDataForm = ({ name }) => {
  const { authorizedUser } = useContext(ProgramContext)
  const { profileUpdating, curEditingForm, setCurEditingForm } = useContext(ProfileContext)
  const fields = getRegularDataFormFields(authorizedUser);
  const [regularFormState, setRegularFormState] = useState(fields)
  const [regularDataFormInstance] = Form.useForm();
  const { token } = useToken();

  const isEditing = curEditingForm === name;

  const cancelChanges = () => {
    setCurEditingForm('');
    setRegularFormState(fields);
  }

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
        labelCol={{span: 10}}
            wrapperCol={{span: 14}}
        labelAlign='left'
        onValuesChange={handleValuesChange}
        form={regularDataFormInstance}
        disabled={profileUpdating && !isEditing}
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
        {/* {authorizedUser.role !== 'admin' ? (
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: library.validationErrorMessages.requiredField }]}
          >
            <Input />
          </Form.Item>
        ) : (
          null
        )} */}
        <ApplyOrCancel
          isEdit={isEditing}
          applyChanges={applyChanges}
          cancelChanges={cancelChanges}
          loading={profileUpdating}
        />
      </Form>
    </div>

  );
};

export default RegularDataForm;
