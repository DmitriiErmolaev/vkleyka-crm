import React, {useContext, useEffect, useLayoutEffect, useRef} from 'react';
import Chat from './Chat';
import { Drawer } from "antd";
import '../../assets/chat/dialog.scss';
import { WorkPageContext } from '../../models/context';
import { getDataFromCollSnapshot } from '../../models/data-processing';


const Dialogue = ({setDialogueWindowOpen, selectedDialogue, setSelectedDialogue}) => {
  const dialogueContainerRef = useRef(null);
  const {cleintsData} = useContext(WorkPageContext);

  useLayoutEffect(() => {
    console.log(dialogueContainerRef.current)
    console.log(dialogueContainerRef.current.style.top)
    dialogueContainerRef.current.style.top = `${window.scrollY}px`;
  },[])

  // когда открывается список чатов. Диалог тоже начинает рендерится.
  // Данная проверка это предотвращает.
  // if(!dialogueWindowOpen) {
  //   return null;
  // }
 
  const handleDialogClose = () => {
    setDialogueWindowOpen(false)
    setSelectedDialogue(null)

  }

  const client = cleintsData.find(user => {
    return user.UID === selectedDialogue.dialogue.UID;
  })

  const userName = client.name
  ? client.name
  : (
      client.passports[0]?.first_name
        ? `${client.passports[0].first_name} ${client.passports[0].last_name}`
        : client.UID
    )
  
  return (
    <div
      ref={dialogueContainerRef}
      style={{position:'relative'}}
    >
      <Drawer
        bodyStyle={{padding:"0"}}
        width={600}
        rootClassName="dialog"
        placement="left"
        title="Чат"
        mask={false}
        open={true}
        onClose={handleDialogClose}
        getContainer={false}
        zIndex={99}
      >
        <Chat applicantName={userName} applicantId={selectedDialogue.dialogue.UID} unreadMessagesNumber={selectedDialogue.unreadMessagesNumber} clientApplicationsSnaps={selectedDialogue.clientApplicationsSnaps} source="global-chat"/>
      </Drawer>
    </div>
  );
};

export default Dialogue;
