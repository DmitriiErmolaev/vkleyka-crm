import React, {useState, useEffect, useRef, useContext, useLayoutEffect} from 'react';
import DialoguesListContainer from './DialoguesListContainer';
import Dialogue from './Dialogue';
import { WorkPageContext } from '../../models/context';


const GlobalChat = ({chatListOpen, setChatListOpen, selectedDialogue, setSelectedDialogue}) => {
  const [ dialogueWindowOpen, setDialogueWindowOpen ] = useState(false);
  const bodyClientWidth = useRef(document.body.clientWidth);
  const { setScrollMode, dialogueForApplication } = useContext(WorkPageContext);

  useLayoutEffect(() => {
    if(chatListOpen) {
      document.body.setAttribute('style', 'overflow: hidden');
      document.body.setAttribute('style', `overflow: hidden; padding-right: ${document.body.clientWidth - bodyClientWidth.current}px`);
      return () => document.body.setAttribute('style', 'overflow: auto');
    }
  }, [chatListOpen])

  const handleDrawerClose = () => {
    setChatListOpen(false);
    setDialogueWindowOpen(false);
    setScrollMode(false);

    if (dialogueForApplication.current ) {
      // console.log(dialogueForApplication.current)
      if(selectedDialogue?.dialogue.UID !== dialogueForApplication.current.UID) {
        setSelectedDialogue({dialogue: dialogueForApplication.current})
      }
    } else {
      setSelectedDialogue(null);
    }
  }

  return (
    <>
      <DialoguesListContainer
        chatListOpen={chatListOpen}
        handleDrawerClose={handleDrawerClose}
        selectedDialogue={selectedDialogue}
        setSelectedDialogue={setSelectedDialogue}
        setDialogueWindowOpen={setDialogueWindowOpen}
      />
        <Dialogue
          dialogueWindowOpen={dialogueWindowOpen}
          setDialogueWindowOpen={setDialogueWindowOpen}
          selectedDialogue={selectedDialogue}
          setSelectedDialogue={setSelectedDialogue}
        />
    </>
  );
};

export default GlobalChat;
