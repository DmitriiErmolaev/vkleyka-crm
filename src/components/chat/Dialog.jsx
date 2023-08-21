import React, {useEffect} from 'react';
import Chat from './Chat';
import { Drawer } from "antd";
import '../../assets/chat/dialog.scss';


const Dialog = ({users, dialogueWindowOpen, setDialogueWindowOpen, selectedDialogue}) => {
  // когда открывается список чатов. Диалог тоже начинает рендерится.  
  // Данная проверка это предотвращает.
  if(!dialogueWindowOpen) {
    return null;
  }
 
  const handleDialogClose = () => {
    setDialogueWindowOpen(false)
  }

  const user = users.find(user => {
    return user.UID === selectedDialogue.dialogue.UID;
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
      open={dialogueWindowOpen}
      onClose={handleDialogClose}
      getContainer={false}
      zIndex={99}
    >
      <Chat applicantName={userName} applicantId={selectedDialogue.dialogue.UID} unreadMessagesExist={selectedDialogue.unreadMessagesNumber} source="global-chat"/>
    </Drawer>
  );
};

export default Dialog;
