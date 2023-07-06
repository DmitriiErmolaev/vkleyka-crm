import React from 'react';
import { Select } from 'antd';
import { testStatuses } from '../../models/status/status';
import { getStatusesSelectOptions } from '../../models/status/status';
import { updateDocField } from '../../models/data-processing';
import { getAppRefById } from '../../models/applications/applications';

const StatusesSelect = ({curStatus, appDocId}) => {
  const handleSelect = async (value, option) => {
    const appDocRef = getAppRefById(appDocId)
    await updateDocField(appDocRef, "preparedInformation.preparationStatus",  option.value)
  }

  return (
    <Select 
      value={testStatuses[curStatus].selectLabel}
      dropdownStyle={{width:"382px", borderRadius:"0"}}
      placement="bottomRight" 
      bordered={false} 
      style={{position:"relative", left:"-390px", top:"1px", width:"382px"}}
      popupMatchSelectWidth={false} 
      options={getStatusesSelectOptions()} 
      onSelect={handleSelect}
    />
  );
};

export default StatusesSelect;