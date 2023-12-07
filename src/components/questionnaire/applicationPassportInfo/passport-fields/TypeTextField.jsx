import { Input } from 'antd';
import React, { useContext } from 'react';
import { PassportInfoContext } from '../../../../models/context';

const TypeTextField = ({isEdit, dbValue}) => {
  const passportIndex = useContext(ApplicantPassportContext)
  const {isEdit} = useContext(PassportInfoContext);

  // const value = isEdit ? : dbValue;

  return (
    <Form.Item 
      name=''
    >
      {isEdit ? (
        <Input value={dbValue}/>
      ) : (
        {dbValue}
      )}
    </Form.Item>
  );
};

export default TypeTextField;
