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
      // TODO: при сужении экрана - селектор прыгает под прогресс бар, 
      // т.к. располагается видимо в ::after прогресс бара, который адаптирован со смещением под прогресс бар
      value={testStatuses[curStatus].selectLabel}
      dropdownStyle={{
        // width:"382px", // ширина дропдауна, соответствующая фактической ширине прогрессбара
        borderRadius:"0" 
      }}
      placement="bottomRight" 
      bordered={false} 
      style={{
        position:"relative", 
        left:"-390px", 
        top:"0px", // сдвиг селектора по вертикали, чтобы верхний край дропдауна начинался с нижнего края прогрессбара и не было щели. 
        width:"382px", //ширина селектора, соответствующая !! фактической !! ширине прогресс бара.
        font:"400 18px Inter, sans-serif" // Todo: менять через DesignToken. Так не срабатывает.
      }}
      options={getStatusesSelectOptions()} 
      onSelect={handleSelect}
    />
  );
};

export default StatusesSelect;