import React from 'react';
import Chat from './Chat';
import { Drawer } from "antd";


const Dialog = ({users, dialogWindowOpen, setDialogWindowOpen, selectedDialog}) => {
  // когда открывается список чатов. Диалог тоже начинает рендерится.  
  // Данная проверка это предотвращает.
  if(!dialogWindowOpen) {
    return 
  }

  const handleDialogClose = () => {
    setDialogWindowOpen(false)
  }

  const user = users.find(user => {
    return user.UID === selectedDialog.UID;
  })

  const userName = user.name 
  ? user.name 
  : (
      user.passports[0]?.first_name 
        ? `${user.passports[0].first_name} ${user.passports[0].last_name}`
        : user.UID
    )

  return (
    <Drawer
      bodyStyle={{padding:"0"}}
      width={ 500}
      rootClassName="dialog"
      placement="left"
      title="Чат"
      mask={false}
      open={dialogWindowOpen}
      onClose={handleDialogClose}
      getContainer={false}
      zIndex={99}
    >
      <Chat applicantName={userName} applicantId={selectedDialog.UID} source="global-chat"/>
    </Drawer>
  );
};

export default Dialog;
