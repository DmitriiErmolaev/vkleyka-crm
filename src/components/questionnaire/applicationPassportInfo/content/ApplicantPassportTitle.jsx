import React, { useContext } from 'react';
import '../../../../assets/application/passports/applicant-title.scss';
import { ApplicantPassportContext } from '../../../../models/context';

const ApplicantPassportTitle = ({passport}) => {
  const {passportIndex} = useContext(ApplicantPassportContext);

  return (
    <div key={`applicant-${passportIndex}-passport-title`} className="applicant-passport__title">
      {`Заявитель №${passportIndex + 1}. ${passport.first_name} ${passport.last_name}`}
    </div>
  );
};

export default ApplicantPassportTitle;
