import React from 'react';
import {FileTextOutlined} from '@ant-design/icons';
import '../../../assets/chat/application-exist-info.scss';
import { getNumberOfApplications } from '../../../utils';

const ApplicationExistsInfo = ({clientApplicationsSnaps}) => {
  const numberOfApplications = getNumberOfApplications(clientApplicationsSnaps.length)
  return clientApplicationsSnaps.length > 0 ? (
    <div className="application-exists">
      <div className="application-exists__container">
        <div className="application-exists__icon">
          <FileTextOutlined style={{fontSize:"16px"}}/>
        </div>
        <div className="application-exists__content">
          {numberOfApplications}
        </div>
      </div>
    </div>
  ) : (
    <div className="application-not-exists"></div>
  )
};

export default ApplicationExistsInfo;
