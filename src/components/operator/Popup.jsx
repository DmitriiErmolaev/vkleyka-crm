import React, {useState} from 'react';
import NewOperatorForm from "./NewOperatorForm";
import {Modal} from "antd";


const Popup = ({isModalOpened, closeRegisterModal, adminsState}) => {
  const [isFormCancelled, setIsFormCancelled] = useState(false);

  const cancelForm = () => {
    closeRegisterModal()
    setIsFormCancelled(true);
  }

  return (
    <Modal 
      open={isModalOpened} 
      onCancel={cancelForm} 
      footer={null}
      maskStyle={{backgroundColor:"#0000009C"}}
      width="38%"
    >
      <NewOperatorForm closeRegisterModal={closeRegisterModal} adminsState={adminsState} isFormCancelled={isFormCancelled} setIsFormCancelled={setIsFormCancelled}/>
    </Modal>
  );
};

export default Popup;