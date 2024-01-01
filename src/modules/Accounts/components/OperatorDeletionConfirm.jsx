import { Button } from 'antd';
import React, { useContext } from 'react';
import '../../../assets/operator/operator-deletion-confirm.scss';
import { OperatorsContext } from '../../../models/context';

const OperatorDeletionConfirm = ({deleteWithoutReassign, setPopupIsOpened}) => {
  const { deletingOperatorName } = useContext(OperatorsContext)

  const confirmDeletion = () => {
    deleteWithoutReassign()
  }

  const cancelDeletion = () => {
    setPopupIsOpened(false);
  }

  return (
    <div className='operator-deletion'>
      <p className='operator-deletion__title'>
        Удалить аккаунт визовика
        <span className="operator-deletion__operator-to-be-deleted">
          {deletingOperatorName}
        </span>
      </p>
      <div className="operator-deletion__buttons">
        <Button type='primary' onClick={confirmDeletion}>Да</Button>
        <Button type='default' onClick={cancelDeletion}>Нет</Button>
      </div>
    </div>
  );
};

export default OperatorDeletionConfirm;
