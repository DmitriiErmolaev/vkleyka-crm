import React from 'react';
import '../../../../assets/application/passports/passport-field.scss';
import TypeTextField from '../passport-fields/TypeTextField';
import TypeDateField from '../passport-fields/TypeDateField';
import TypePhotoField from '../passport-fields/TypePhotoField';

const components = {
  string: TypeTextField,
  date: TypeDateField,
  photo: TypePhotoField,
}

const PassportField = ({passportFieldInfo, dbValue}) => {
  const FieldValueComponent = components[passportFieldInfo.valueType];

  return (
    <div className='passport-field'>
      <h3 className='passport-field__title'>{passportFieldInfo.fieldTitle}:</h3>
      <div className='passport-field__value'>
        <FieldValueComponent fieldName={passportFieldInfo.propWithValue} dbValue={dbValue}/>
      </div>
    </div>
  );
};

export default PassportField;
