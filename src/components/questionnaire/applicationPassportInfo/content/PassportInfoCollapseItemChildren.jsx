import React from 'react';
import ApplicantPassportTitle from './ApplicantPassportTitle';
import ApplicantPassportFields from './ApplicantPassportFields';
import ApplicantPassport from './ApplicantPassport';

const PassportInfoCollapseItemChildren = ({passports}) => {
  
  const applicantPassports = passports.map((passport, index) => { // массив заявителей.
    return (
      <ApplicantPassport key={`applicant-${index}-passport`} >
        <ApplicantPassportTitle passport={passport} index={index} />
        <ApplicantPassportFields passport={passport} />
      </ApplicantPassport>
    )
  })

  return applicantPassports;
};

export default PassportInfoCollapseItemChildren;
