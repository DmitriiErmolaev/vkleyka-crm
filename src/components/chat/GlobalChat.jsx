import React, {useState, useEffect, useContext} from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import DialoguesList from './DialoguesList';
import Dialog from './Dialog';
import { getChatsQueryForDialoguesList } from '../../models/chat/chat-data-processing';
import { ProgramContext } from '../../models/context';
import { getDataFromCollSnapshot } from '../../models/data-processing';
import { getUsersQuery } from '../../models/applicants/applicants';
import Error from '../error/Error';

const GlobalChat = ({drawerOpen, setDrawerOpen}) => {
  const {authorizedUser} = useContext(ProgramContext);
  const [dialogueWindowOpen, setDialogueWindowOpen] = useState(false)
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const [contentScrollTop, setContentScrollTop] = useState(0);
  const [chatsCollSnapshot, chatsLoading, chatsError] = useCollection(getChatsQueryForDialoguesList(authorizedUser));
  const [usersCollSnapshot, usersLoading, usersError] = useCollection(getUsersQuery());

  useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');
    return () => document.body.setAttribute('style', 'overflow: auto');
  })

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setDialogueWindowOpen(false)
  }

  if (chatsLoading || usersLoading) {
    // console.log('GlobalChat качает чаты и пользователей')
    return
  }

  if(chatsError || usersError ) {
    return <Error error={chatsError}/>
  }
  
  const users = getDataFromCollSnapshot(usersCollSnapshot);

  return (
    <>
      <DialoguesList 
        drawerOpen={drawerOpen} 
        handleDrawerClose={handleDrawerClose} 
        chatsCollSnapshot={chatsCollSnapshot} 
        users={users} 
        setSelectedDialogue={setSelectedDialogue} 
        setDialogueWindowOpen={setDialogueWindowOpen} 
        contentScrollTop={contentScrollTop}
      />
      <Dialog 
        users={users} 
        dialogueWindowOpen={dialogueWindowOpen} 
        setDialogueWindowOpen={setDialogueWindowOpen} 
        selectedDialogue={selectedDialogue} 
      />
    </>
  );
};

export default GlobalChat;
