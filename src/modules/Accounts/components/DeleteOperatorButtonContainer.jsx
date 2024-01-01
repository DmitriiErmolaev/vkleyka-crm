import React, { useContext } from 'react';
import DeleteOperatorButton from './DeleteOperatorButton';
import { OperatorsContext } from '../../../models/context';


const DeleteOperatorButtonContainer = ({id, name}) => {
  const {setActionType, setDeletingOperatorId, setDeletingOperatorName, setPopupIsOpened} = useContext(OperatorsContext);

  const openPopupToReassign = () => {
    setDeletingOperatorId(id);
    setDeletingOperatorName(name);
    setActionType('deleteOperator');
    setPopupIsOpened(true);
  }

  return (
    <DeleteOperatorButton openPopupToReassign={openPopupToReassign}/>
  );
};

export default DeleteOperatorButtonContainer;
