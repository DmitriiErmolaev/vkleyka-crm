import React from 'react';
import { getPassportFieldsMatrix } from '../../../../models/applications/questionnaire/questionnaire';
import PassportField from './PassportField';



const ApplicantPassportFields = ({passport}) => {

  const passportFieldsMatrix = getPassportFieldsMatrix();

  const passportFields = passportFieldsMatrix.map(passportFieldInfo => {
    return <PassportField key={passportFieldInfo.propWithValue} passportFieldInfo={passportFieldInfo} dbValue={passport[passportFieldInfo.propWithValue]}/>
  })

  return passportFields
};

export default ApplicantPassportFields;
