import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Select } from 'antd';
import SelectComponent from '../selectors/SelectComponent';
import '../../assets/application-info-card-footer.scss';
import { getApplicationsSwitcherOptions } from '../../models/applications/applications-switcher';
const {Title} = Typography;


const ApplicationInfoCardFooter = ({assignedTo, dialogueSnap, currentClientApplications}) => {
  const {appId, clientId} = useParams();
  const navigate = useNavigate();

  const handleChange = (value, _option) => {
    if (value === appId) {
      return
    }
    navigate(`/application/${clientId}/${value}`);
  }

  const applicationSwitcherOptions = getApplicationsSwitcherOptions(currentClientApplications);

  return (
    <div className="aplication-info-card__footer">
      <div className="aplication-info-card__assignedTo">
        <Typography >
          <Title style={{color:"#fff"}} level={4}>
            Отв-ный
          </Title>
        </Typography>
        <SelectComponent data={{clientApplicationsSnaps: currentClientApplications, assignedTo, dialogueSnap, transparent: false}} collectionType="operators"/>
      </div>
      <div className="aplication-info-card__application-switcher">
        <Typography >
          <Title style={{color:"#fff"}} level={4}>
            Количество заявок: {currentClientApplications.length}
          </Title>
        </Typography>
        <Select
          style={{
            width: 150,
          }}
          dropdownStyle={{
            width:"240px",
          }}
          onSelect={handleChange}
          options={applicationSwitcherOptions}
          value={appId}
        />
      </div>
    </div>
  );
};

export default ApplicationInfoCardFooter;
