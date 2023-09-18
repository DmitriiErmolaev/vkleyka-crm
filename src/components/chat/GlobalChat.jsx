import React, {useState, useEffect, useContext, useRef, useLayoutEffect} from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import DialoguesList from './DialoguesList';
import Dialogue from './Dialogue';
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
  const [searchFilters, setSearchFilters ] = useState('');
  const dialoguesListRef = useRef(null)
  const [chatsCollSnapshot, chatsLoading, chatsError] = useCollection(getChatsQueryForDialoguesList(authorizedUser, searchFilters));
  const [usersCollSnapshot, usersLoading, usersError] = useCollection(getUsersQuery());
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
        selectedDialogue={selectedDialogue}
        setSelectedDialogue={setSelectedDialogue} 
        setDialogueWindowOpen={setDialogueWindowOpen} 
        contentScrollTop={contentScrollTop}
        setSearchFilters={setSearchFilters}
      />
      {
        dialogueWindowOpen ? (
          <Dialogue 
            users={users} 
            // dialogueWindowOpen={dialogueWindowOpen} 
            setDialogueWindowOpen={setDialogueWindowOpen} 
            selectedDialogue={selectedDialogue} 
            setSelectedDialogue={setSelectedDialogue}
          />
        ) : (
          null
        )
      }
    </>
  );
};

export default GlobalChat;
