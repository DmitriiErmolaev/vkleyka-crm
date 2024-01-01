import React, {useContext} from 'react';
import { Modal } from "antd";
import DeleteOperator from './DeleteOperator';
import { OperatorsContext } from '../../../models/context';
import NewOperator from './NewOperator';
import '../../../assets/operator/popup.scss';

const Popup = () => {
  const { actionType,popupIsOpened, setPopupIsOpened} = useContext(OperatorsContext);

  const closePopup = () => {
    setPopupIsOpened(false);
  }

  return (
    <Modal
      styles={{
        mask: {backgroundColor:"#0000009C"},
      }}
      open={popupIsOpened}
      onCancel={closePopup}
      footer={null}
      width="38%"
      destroyOnClose={true}
      // centered={true}
      wrapClassName='popup__contaier'
    >
      {actionType === 'createOperator' && <NewOperator/>}
      {actionType === 'deleteOperator' && <DeleteOperator />}
    </Modal>
  );
};

export default Popup;
