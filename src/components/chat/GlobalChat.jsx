import React, {useState, useEffect, useContext, useRef, useLayoutEffect} from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import DialoguesListContainer from './DialoguesListContainer';
import Dialogue from './Dialogue';
import { getChatsQueryForDialoguesList } from '../../models/chat/chat-data-processing';
import { ProgramContext, WorkPageContext } from '../../models/context';
import { getDataFromCollSnapshot } from '../../models/data-processing';
import { getUsersQuery } from '../../models/clients/clients';
import Error from '../error/Error';

const GlobalChat = ({drawerOpen, setDrawerOpen}) => {
  const {authorizedUser, role} = useContext(ProgramContext)
  const [dialogueWindowOpen, setDialogueWindowOpen] = useState(false);
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const bodyClientWidth = useRef(document.body.clientWidth);

  useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');
    document.body.setAttribute('style', `overflow: hidden; padding-right: ${document.body.clientWidth - bodyClientWidth.current}px`);
    return () => document.body.setAttribute('style', 'overflow: auto');
  })

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setDialogueWindowOpen(false)
  }

  return (
    <>
      <DialoguesListContainer
        drawerOpen={drawerOpen}
        handleDrawerClose={handleDrawerClose}
        selectedDialogue={selectedDialogue}
        setSelectedDialogue={setSelectedDialogue}
        setDialogueWindowOpen={setDialogueWindowOpen}
      />
      {dialogueWindowOpen ? (
        <Dialogue
          setDialogueWindowOpen={setDialogueWindowOpen}
          selectedDialogue={selectedDialogue}
          setSelectedDialogue={setSelectedDialogue}
        />
      ) : (
        null
      )}
    </>
  );
};

export default GlobalChat;
