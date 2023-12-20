import { Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { ApplicantPassportContext, PassportInfoContext } from '../../../../models/context';

const TypeTextField = ({fieldName, dbValue}) => {
  const { passportIndex } = useContext(ApplicantPassportContext);
  const { isEdit } = useContext(PassportInfoContext);

  return (
    <Form.Item
      name={[String(passportIndex), fieldName ]}
      initialValue={dbValue}
    >
      {isEdit ? (
        <Input />
      ) : (
        dbValue
      )}
    </Form.Item>
  );
};

export default TypeTextField;
