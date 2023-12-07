import React from 'react';
import ApplicantPassportTitle from './ApplicantPassportTitle';
import ApplicantPassportFields from './ApplicantPassportFields';

const ApplicantPassport = ({children}) => {
  return (
    <div className="applicant-passport">
      {children}
    </div>
  )
};

export default ApplicantPassport;