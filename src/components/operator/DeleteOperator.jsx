import React, { useContext, useEffect, useState } from 'react';
import ReassignAndDeleteForm from './ReassignAndDeleteForm';
import { useCollectionDataOnce, useCollectionOnce } from 'react-firebase-hooks/firestore';
import { getDeletingOperatorAppsQuery, getDeletingOperatorChatQuery } from '../../models/operator/operators';
import { OperatorsContext, ProgramContext } from '../../models/context';
import Spinner from '../spinner/Spinner';
import { deleteOperator, reassign } from '../../models/operator/operators-data-processing';
import OperatorDeletionConfirm from './OperatorDeletionConfirm';

const DeleteOperator = () => {
  const [ selectedOperator, setSelectedOperator ] = useState(null);
  const { admins, notificationApi } = useContext(ProgramContext)
  const { deletingOperatorId, setDeletingOperatorId, setActionType, popupIsOpened, setPopupIsOpened } = useContext(OperatorsContext);
  const [ deletingOperatorAppsCollSnap, appsLoading, appsError ] = useCollectionOnce(getDeletingOperatorAppsQuery(deletingOperatorId));
  const [ deletingOperatorChatCollSnap, chatLoading, chatError ] = useCollectionOnce(getDeletingOperatorChatQuery(deletingOperatorId));
  
  useEffect(()=> {
    // очистить все стейты при закрытии попапа
    if(!popupIsOpened) {
      setActionType(null)
      setDeletingOperatorId(null)
      setSelectedOperator(null)
    }
  },[popupIsOpened])

  if(appsLoading || chatLoading) {
    return <Spinner />
  }

  const isAppsWithChatWereNotAssigned = !deletingOperatorAppsCollSnap.size && !deletingOperatorChatCollSnap.size;

  const deleteWithoutReassign = async () => {
    await deleteOperator(admins, deletingOperatorId, notificationApi);
    setPopupIsOpened(false)
  }

  const reassignAndDelete = async () => {
    await reassign(deletingOperatorAppsCollSnap, deletingOperatorChatCollSnap, selectedOperator, notificationApi);
    await deleteOperator(admins, deletingOperatorId, notificationApi);
    setPopupIsOpened(false)
    // TODO: доделать обработку ошибок. Удаление не должно происходить если переназначение провалено.
  }

  return isAppsWithChatWereNotAssigned ? (
    <OperatorDeletionConfirm deleteWithoutReassign={deleteWithoutReassign} setPopupIsOpened={setPopupIsOpened}/>
  ) : (
    <ReassignAndDeleteForm setSelectedOperator={setSelectedOperator} selectedOperator={selectedOperator} reassignAndDelete={reassignAndDelete} />
  );
};

export default DeleteOperator;
