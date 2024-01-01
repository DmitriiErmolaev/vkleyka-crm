import React from 'react';
import '../../../../assets/application/passports/passport-collpse-item-label.scss';

const PassportInfoCollapseItemLabel = ({appId, passportsLength}) => {
  return (
    <div className='passport-collapse-item-label'>
      <div className="passport-collapse-item-label__title">
        Заявка {appId}
      </div>
      <div className="passport-collapse-item-label__applicants-num">
        количество заявителей: {passportsLength}
      </div>
    </div>
  );
};

export default PassportInfoCollapseItemLabel;
