import React, {useContext, useEffect, useLayoutEffect, useRef} from 'react';
import Chat from './Chat';
import { Drawer } from "antd";
import '../../assets/chat/dialog.scss';
import { WorkPageContext } from '../../models/context';
import { getDataFromCollSnapshot } from '../../models/data-processing';


const Dialogue = ({dialogueWindowOpen, setDialogueWindowOpen, selectedDialogue, setSelectedDialogue}) => {
  const dialogueContainerRef = useRef(null);
  const {clientsData, setScrollMode, dialogueForApplication} = useContext(WorkPageContext);

  useLayoutEffect(() => {
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
    setScrollMode(false)
    if (dialogueForApplication.current) {
      setSelectedDialogue({dialogue: dialogueForApplication.current})
    } else {
      setSelectedDialogue(null);
    }
  }

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
        open={dialogueWindowOpen}
        onClose={handleDialogClose}
        getContainer={false}
        zIndex={99}
      >
        {selectedDialogue ? (
          <Chat
            applicantId={selectedDialogue.dialogue.UID}
            clientApplicationsSnaps={selectedDialogue.clientApplicationsSnaps}
            source="global-chat"
          />
        ) : (
          null
        )}

      </Drawer>
    </div>
  );
};

export default Dialogue;
