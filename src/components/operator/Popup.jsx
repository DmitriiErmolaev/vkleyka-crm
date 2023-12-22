import React, {useContext} from 'react';
import NewOperatorForm from "./NewOperatorForm";
import { Modal } from "antd";
import DeleteOperator from './DeleteOperator';
import { OperatorsContext } from '../../models/context';
import NewOperator from './NewOperator';

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
    >
      {actionType === 'createOperator' && <NewOperator/>}
      {actionType === 'deleteOperator' && <DeleteOperator />}
    </Modal>
  );
};

export default Popup;
