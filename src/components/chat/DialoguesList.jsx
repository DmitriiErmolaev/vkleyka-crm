import React, {useEffect, useContext, useState} from 'react';
import { ProgramContext } from '../../models/context';
import { Spin } from 'antd';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Drawer } from "antd";
import { getChatsQueryForDialoguesList } from '../../models/chat/chat-data-processing';
import { getDataFromCollSnapshot } from '../../models/data-processing';
import { getUsersQuery } from '../../models/applicants/applicants';
import Error from '../error/Error';
import DialogueListItem from './DialogueListItem';
import Chat from './Chat';
import Dialog from './Dialog';


const DialoguesList = ({drawerOpen, setDrawerOpen}) => {
  const {authorizedOperator} = useContext(ProgramContext);
  const [chatsCollSnapshot, chatsLoading, chatsError] = useCollection(getChatsQueryForDialoguesList(authorizedOperator.id));
  const [usersCollSnapshot, usersLoading, usersError] = useCollection(getUsersQuery());
  const [selectedDialogApplicantId, setSelectedDialogApplicantId] = useState(null);
  const [dialogWindowOpen, setDialogWindowOpen] = useState(false)
  // TODO: из DialogueListItem можно в стайт записать весь диалог. Который потом передать в Dialog/Сhat. Но там свое скачивание. повторное
  
  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setDialogWindowOpen(false)
  }

  if(chatsLoading || usersLoading){
    return (
      <Drawer
        bodyStyle="drawer-body"
        rootClassName="drawer"
        placement="left"
        title="Чат"
        open={drawerOpen}
        onClose={handleDrawerClose}
        getContainer={false}
      >
        <Spin />
      </Drawer>
    ) 
  }

  if(chatsError || usersError ) {
    return <Error error={chatsError}/>
  }

  const dialogues = getDataFromCollSnapshot(chatsCollSnapshot);
  const users = getDataFromCollSnapshot(usersCollSnapshot);
  const dialoguesList = dialogues.map(dialogue => {
    const user = users.find(user => {
      return user.UID === dialogue.UID;
    })
    return <DialogueListItem key={dialogue.UID} user={user} dialogue={dialogue} setSelectedDialogApplicantId={setSelectedDialogApplicantId} setDialogWindowOpen={setDialogWindowOpen}/>
  })
  
  return (
    <>
      <Drawer 
        bodyStyle={{paddingTop:"0"}}
        rootClassName="dialogues-list"
        placement="left"
        title="Чат"
        open={drawerOpen}
        mask={false}
        onClose={handleDrawerClose}
        getContainer={false}
        zIndex="99"
      >
        <ul>
          {dialoguesList}
        </ul>
      </Drawer>
      <Dialog users={users} dialogWindowOpen={dialogWindowOpen} setDialogWindowOpen={setDialogWindowOpen} selectedDialogApplicantId={selectedDialogApplicantId}/>
    </>
    
  );
};

export default DialoguesList;