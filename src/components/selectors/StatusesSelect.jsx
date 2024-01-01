import React, {useContext, useEffect} from 'react';
import { Select } from 'antd';
import { testStatuses } from '../../helpers/app-status.js';
import { getStatusesSelectOptions } from '../../modules/ApplicationToolBar/helpers/getStatusesSelectOptions.js';
import updateDocField  from '../../firebase/updateDocField.js';
import { getAppRefById } from '../../firebase/applications/getAppRefById.js';
import { openNotification } from '../../models/notification/notification.js';
import { ApplicationStatus, ProgramContext } from '../../models/context.js';
import { Transaction, collection, query, runTransaction, serverTimestamp, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.js';
import { getShortApplicationId } from '../../models/applications/table-data-processing.js';
import showNotification from '../../modules/NotificationService/helpers/showNotification.js';

const StatusesSelect = ({appDocId, currentClientApplications, dialogueSnap, assignedTo}) => {
  const {notificationAPI} = useContext(ProgramContext)
  const {curAppStatus} = useContext(ApplicationStatus); // если рендерится из ApplicationForm - получает статус заявки.

  const unFinishedAppsCount = currentClientApplications.reduce((acc, appSnap) => {
    if (appSnap.get('preparedInformation.preparationStatus') !== 2) ++acc;
    return acc;
  }, 0)

  const handleSelect = async (_value, option) => {
    if (curAppStatus === option.value) {
      return false;
    }

    const appDocRef = getAppRefById(appDocId)
    // Меняем статус заявки
    try {
      await updateDocField(appDocRef, "preparedInformation.preparationStatus",  option.value)

      // Сброс визовика с чата, если он закрывает последнюю заявку клиента.
      if ( unFinishedAppsCount === 1 ) {
        runTransaction(firestore, async (transaction) => {
          transaction.update(dialogueSnap.ref, 'assignedTo',  '').update(dialogueSnap.ref, 'active',  false)
        })
      }
      // При возврате заявки в работу, назначаем на чат визовика данной заявки.
      if ((!unFinishedAppsCount && curAppStatus === 2 && option.value === 0) || (!unFinishedAppsCount && curAppStatus === 2 && option.value === 1)) {
        runTransaction(firestore, async (transaction) => {
          transaction.update(dialogueSnap.ref, 'active',  true).update(dialogueSnap.ref, 'assignedTo', assignedTo)
        })
      }
      showNotification(notificationAPI, 'process', {processName: 'statusChanged', status: 'success',})

      // openNotification(notificationAPI, "success", 'statusChanged')
    } catch (e) {
      console.log(e)
      showNotification(notificationAPI, 'process', {processName: 'statusChanged', status: 'error',})

      // openNotification(notificationAPI, "error", 'statusChanged')
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
