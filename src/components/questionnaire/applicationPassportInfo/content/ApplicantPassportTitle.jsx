import React from 'react';
import '../../../assets/application/passports/applicant-title.scss';

const ApplicantPassportTitle = ({passport, index}) => {
  return (
    <div key={`applicant-${index}-passport-title`} className="applicant-passport__title">
      {`Заявитель №${index + 1}. ${passport.first_name} ${passport.last_name}`}
    </div>
  );
};

export default ApplicantPassportTitle;