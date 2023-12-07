import React, { useContext } from 'react';
import { getPassportFieldsMatrix, getPassportInfoValue } from '../../../../models/applications/questionnaire/questionnaire';
import PassportField from './PassportField';
import { PassportInfoContext } from '../../../../models/context';
import { Form } from 'antd';


const ApplicantPassportFields = ({passport}) => {
  const {isEdit} = useContext(PassportInfoContext);

  const passportFieldsMatrix = getPassportFieldsMatrix();
  
  const passportFields = passportFieldsMatrix.map((passportFieldInfo, fieldIndex) => {
    return <PassportField key={passportFieldInfo.key} passportFieldInfo={passportFieldInfo} fieldIndex={fieldIndex}/>
  })

  return passportFields
};

export default ApplicantPassportFields;
