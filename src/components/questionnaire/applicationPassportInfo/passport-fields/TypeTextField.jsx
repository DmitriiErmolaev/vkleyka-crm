import { Input } from 'antd';
import React, { useContext } from 'react';
import { PassportInfoContext } from '../../../../models/context';

const TypeTextField = ({isEdit, dbValue}) => {
  const {isEdit} = useContext(PassportInfoContext);

  const value = isEdit ? : dbValue;

  return (
    <Form.Item >
      {isEdit ? (
        <Input />
      ) : (
        {value}
      )}
    </Form.Item>
  );
};

export default TypeTextField;
