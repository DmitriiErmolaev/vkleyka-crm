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
    // TODO: нотификация, что визовик сменился
  }

  return (
    <Select 
      value={testStatuses[curStatus].selectLabel}
      dropdownStyle={{
        borderRadius:"0" 
      }}
      placement="bottomRight" 
      bordered={false} 
      style={{
        position:"absolute", // чтобы спан прогресс бара позиционировался относительно первого позиционированного родителя - то есть прогресс бара.
        left:0, 
        top:"5px", // сдвиг селектора по вертикали, чтобы верхний край дропдауна начинался с нижнего края прогрессбара и не было щели. 
        width:"382px", //ширина селектора, соответствующая !! фактической !! ширине прогресс бара.
        font:"400 18px Inter, sans-serif" // Todo: менять через DesignToken. Так не срабатывает.
      }}
      options={getStatusesSelectOptions()} 
      onSelect={handleSelect}
    />
  );
};

export default StatusesSelect;
