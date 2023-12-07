import React from 'react';
import ApplicantPassportTitle from './ApplicantPassportTitle';
import ApplicantPassportFields from './ApplicantPassportFields';
import ApplicantPassport from './ApplicantPassport';
import { Form } from 'antd';
import { ApplicantPassportContext } from '../../../../models/context';

const PassportInfoCollapseItemChildren = ({passports}) => {
  
  const applicantPassports = passports.map((passport, passportIndex) => { // массив заявителей.
    //TODO если сработает прокинуть паспортиндекс в тайтл через контекст
    return (
      <ApplicantPassportContext.Provider value={{passportIndex}}> 
        <ApplicantPassport key={`applicant-${passportIndex}-passport`} >
          <ApplicantPassportTitle passport={passport} index={passportIndex} />
          <ApplicantPassportFields passport={passport} />
        </ApplicantPassport>
      </ApplicantPassportContext.Provider>
    )
  })

  return (
    <Form
      name='passports'
      layout='vertical'
    >
      {applicantPassports}
    </Form>
  );
};

export default PassportInfoCollapseItemChildren;
