import React, { useContext } from 'react';
import OperatorsSelect from '../selectors/OperatorsSelect';
import { ApplicationStatus, ProgramContext } from '../../models/context';
import { useNavigate, useParams } from 'react-router-dom';
import { Timestamp, runTransaction } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { openNotification } from '../../models/notification/notification';
import showNotification from '../../modules/NotificationService/helpers/showNotification';

const ChangeOperator = ({dialogueSnap, clientApplicationsSnaps, transparent=true, assignedTo=null, disabledProp=false}) => {
  const { admins, notificationAPI, role } = useContext(ProgramContext)
  const { curAppStatus } = useContext(ApplicationStatus); // если рендерится из ApplicationForm - получает статус заявки.
  const { clientId, appId } = useParams();
  const navigate = useNavigate();

  const changeOperatorIntern = async (value) => {
    if(assignedTo === value) {
      return false;
    }

    try {
      await runTransaction(firestore, async (transaction) => {
        // если clientApplicationsRefs = [], значит ненужно, чтобы происходило назначение оператора на анкету, т.к. у него еще нет оплаченной заявки.
        if (clientApplicationsSnaps.length > 0) {
          for (const applicationSnap of clientApplicationsSnaps) { // каждую заявку клиента
            if (applicationSnap.get('preparedInformation.preparationStatus') === 2) continue; // если она не завершена
            if (role === "operator" && clientId === dialogueSnap.get('UID')) navigate("/"); // если роль визовик и
            transaction.update(applicationSnap.ref, "preparedInformation.assignedTo", value).update(applicationSnap.ref, 'assignedAt', Timestamp.now());
            applicationSnap.get('isRead') && transaction.update(applicationSnap.ref, 'isRead', false);
              // после каждого внесения изменений в бд - происходит ререндер заявки перед следующим внесением изменений. Если открыта заявка на которую я еще пока назначен, то ошибки нет. Когда внесения внесутся в ту заявку, которая сейчас открыта, произойдет ее ререндер и будет ошибка, т.к. на нее  будут неверные где то. 
          }
        }
        if(!dialogueSnap.get('active')) {
          transaction.update(dialogueSnap.ref, "active", true).update(dialogueSnap.ref, "assignedTo", value)
          return
        }
        transaction.update(dialogueSnap.ref, "assignedTo", value);
      })
      showNotification(notificationAPI, 'process', {processName: 'operatorChanged', status: 'success',})
      // openNotification(notificationAPI, "success", 'operatorChanged');
    } catch(e) {
      console.log(e)
      showNotification(notificationAPI, 'process', {processName: 'operatorChanged', status: 'error',})
      // openNotification(notificationAPI, "error", 'operatorChanged')
    }
  }

  const isOperatorIdExist = admins.findIndex(elem => {
    if(elem.role === "operator") {
      return elem.id === assignedTo
    }
    return false;
  })
  const curOperator = isOperatorIdExist !== -1 ? assignedTo : null;
  const selectIsDisabled = curAppStatus === 2 ? true : disabledProp;

  return <OperatorsSelect changeOperatorIntern={changeOperatorIntern} transparent={transparent} curOperator={curOperator} selectIsDisabled={selectIsDisabled}/>
};

export default ChangeOperator;