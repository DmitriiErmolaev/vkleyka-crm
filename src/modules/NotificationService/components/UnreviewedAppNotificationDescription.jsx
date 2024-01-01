import React from 'react';
import '../../../assets/notification/description.scss';

const UnreviewedAppNotificationDescription = ({options}) => {
  const { applicantName, applicationId } = options;

  return (
    <div className='notification-description'>
      <div className="notification-description__name">
        {applicantName}
      </div>
      <div className="notification-description__app-id">
        {applicationId}
      </div>
    </div>
  );
};

export default UnreviewedAppNotificationDescription;