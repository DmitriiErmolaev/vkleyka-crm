import React, {useContext, useState} from 'react';
import { ProgramContext } from '../../models/context';
import { Spin, Card, ConfigProvider, Drawer } from 'antd';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getChatsQueryForDialoguesList } from '../../models/chat/chat-data-processing';
import { getDataFromCollSnapshot } from '../../models/data-processing';
import { getUsersQuery } from '../../models/applicants/applicants';
import Error from '../error/Error';
import DialogueListItem from './DialogueListItem';
import Dialog from './Dialog';
import '../../assets/chat/dialogue-list.scss'

const DialoguesList = ({drawerOpen, setDrawerOpen}) => {
  const {authorizedOperator} = useContext(ProgramContext);
  const [chatsCollSnapshot, chatsLoading, chatsError] = useCollection(getChatsQueryForDialoguesList(authorizedOperator));
  const [usersCollSnapshot, usersLoading, usersError] = useCollection(getUsersQuery());
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const [dialogueWindowOpen, setDialogueWindowOpen] = useState(false)
  // TODO: из DialogueListItem можно в стейт записать весь диалог. Который потом передать в Dialog/Сhat. Но там свое скачивание. повторное
  
  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setDialogueWindowOpen(false)
  }

  if(chatsLoading || usersLoading){
    return (
      <Drawer
        bodyStyle={{paddingTop: "0"}}
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
    const unreadMessagesNumber = dialogue.messages.reduce((acc, elem) => {
      return elem.sendState === 0 ? ++acc : acc
    }, 0)

    const user = users.find(user => {
      return user.UID === dialogue.UID;
    })
    
    return <DialogueListItem key={dialogue.UID} user={user} dialogue={dialogue} setSelectedDialogue={setSelectedDialogue} setDialogueWindowOpen={setDialogueWindowOpen} unreadMessagesNumber={unreadMessagesNumber}/>
  })
  
  return (
    <>
      <Drawer 
        bodyStyle={{padding:"5px 0 10px 0"}}
        rootClassName="dialogues-list"
        placement="left"
        title="Чат"
        open={drawerOpen}
        mask={false}
        onClose={handleDrawerClose}
        getContainer={false}
        zIndex={100}
      >
        <ConfigProvider
          theme={{
            components:{
              Card: {
                actionsBg:"black"
              }
            }
          }}
        >
          <Card
            bordered={false}
            bodyStyle={{padding:"0", borderRadius:"0"}}

          >
            {dialoguesList}
          </Card>
        </ConfigProvider>
      </Drawer>
      <Dialog users={users} dialogueWindowOpen={dialogueWindowOpen} setDialogueWindowOpen={setDialogueWindowOpen} selectedDialogue={selectedDialogue} />
    </>
  );
};

export default DialoguesList;
