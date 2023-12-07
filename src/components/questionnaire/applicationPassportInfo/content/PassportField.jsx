import React, { useContext } from 'react';
import '../../../assets/application/passports/passport-field.scss';
import TypeTextField from '../passport-fields/TypeTextField';
import TypeDateField from '../passport-fields/TypeDateField';
import TypePhotoField from '../passport-fields/TypePhotoField';
import { ApplicantPassportContext, PassportInfoContext } from '../../../../models/context';

const components = {
  text: TypeTextField,
  date: TypeDateField,
  Photo: TypePhotoField,
}

const PassportField = ({passportFieldInfo, fieldValue, passportIndex, passportFieldIndex}) => {
  const FieldValueComponent = components[passportFieldInfo.type];

  return (
    <div className='passport-field'>
      <h3 className='passport-field__title'>{passportFieldInfo.fieldTitle}:</h3>
      <div className='passport-field__value'>
        <FieldValueComponent />
      </div>
    </div>
  );
};

export default PassportField;
