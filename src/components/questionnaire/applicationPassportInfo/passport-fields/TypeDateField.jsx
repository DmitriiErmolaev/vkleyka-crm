import React, { useContext } from 'react';
import { ApplicantPassportContext, PassportInfoContext } from '../../../../models/context';
import { Form } from 'antd';
import dayjs from 'dayjs';
import DatePickerContainer from '../DatePickerContainer';

const TypeDateField = ({fieldName, dbValue}) => {
  const { passportIndex } = useContext(ApplicantPassportContext);
  const { isEdit } = useContext(PassportInfoContext);

  return (
    <Form.Item
      name={[String(passportIndex), fieldName ]}
      // initialValue={dbValue.seconds || ''}
      initialValue={dbValue || ''}
    >
      <DatePickerContainer isEdit={isEdit}/>
    </Form.Item>
  );
};

export default TypeDateField;
