import React, {useContext, useEffect} from 'react';
import { Select } from 'antd';
import { testStatuses } from '../../models/status/status';
import { getStatusesSelectOptions } from '../../models/status/status';
import { updateDocField } from '../../models/data-processing';
import { getAppRefById } from '../../models/applications/applications';
import { openNotification } from '../../models/notification/notification.js';
import { ApplicationStatus, ProgramContext } from '../../models/context.js';

const StatusesSelect = ({appDocId, currentClientApplications, dialogueSnap, assignedTo}) => {
  
  const {notificationApi} = useContext(ProgramContext)
  const {curAppStatus} = useContext(ApplicationStatus); // если рендерится из ApplicationForm - получает статус заявки.

  const unFinishedAppsExist = currentClientApplications.some(appSnap => {
    return appSnap.get('preparedInformation.preparationStatus') !== 2;
  })

  useEffect(() => {
    // если все заявки клиента завершены, то сбрасываем чат.
    if (!unFinishedAppsExist) {
      const finishChat = async () => {
        await updateDocField(dialogueSnap.ref, 'assignedTo',  '');
        await updateDocField(dialogueSnap.ref, 'active',  false);
      }
      finishChat();
    }
  },[dialogueSnap, unFinishedAppsExist])

  const handleSelect = async (_value, option) => {
    if (curAppStatus === option.value) {
      return false;
    }
  

    const appDocRef = getAppRefById(appDocId)
    // Меняем статус заявки
    try {
      await updateDocField(appDocRef, "preparedInformation.preparationStatus",  option.value)  
      // При возврате заявки в работу, назначаем на чат визовика данной заявки.
      if ((!unFinishedAppsExist && curAppStatus === 2 && option.value === 0) || (!unFinishedAppsExist && curAppStatus === 2 && option.value === 1)) {
        await updateDocField(dialogueSnap.ref, 'active',  true) ;
        await updateDocField(dialogueSnap.ref, 'assignedTo', assignedTo);
      }    
      openNotification(notificationApi, "success", 'statusChanged')
    } catch (e) {
      console.log(e)
      openNotification(notificationApi, "error", 'statusChanged')
    }
  }

  return (
    <Select 
      value={testStatuses[curAppStatus].selectLabel}
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
