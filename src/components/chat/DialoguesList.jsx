import React, {useContext, useRef, useEffect} from 'react';
import { Card, Drawer } from 'antd';
import { useCollection } from 'react-firebase-hooks/firestore';
import Error from '../error/Error';
import DialogueListItem from './DialogueListItem';
import DialogueSearch from './DialogueSearch';
import '../../assets/chat/dialogue-list.scss';
import { getApplicationsBySetOfApplicantIDs } from '../../models/chat/dialogue-list/dialogue-list-data-processing';
import { ProgramContext } from '../../models/context';
import { dialogueListGroups } from '../../models/chat/dialogue-list/dialogue-list';
import { getAdminDialogueData } from '../../models/chat/dialogue-list/dialogue-list';
import { dialogListOperations } from '../../models/chat/dialogue-list/dialogue-list';
import { getDialogueList } from '../../models/chat/dialogue-list/dialogue-list';

const DialoguesList = ({drawerOpen, handleDrawerClose, chatsCollSnapshot, users, setSelectedDialogue, setDialogueWindowOpen, contentScrollTop}) => {
  // TODO: прокинуть сюда лоадинг чатов и ждать пока они не загрузятся, но в этом время лист уже открытый и мы видим скелетон. То есть при нажатии на кнопку открывается глобал чат и грузится лист. При закрытии установить на загрытие лист, и следом закрыть глобал чат
  
  const {authorizedUser, role} = useContext(ProgramContext)
  const drawerRef = useRef(null);
  // console.log(chatsCollSnapshot.docs.length)

  const downloadedChatsApplicantIDs = chatsCollSnapshot.docs.map(docSnap => {
    return docSnap.get('UID');
  })

  const [appsCollSnapshot, appsLoading, appsError] = useCollection(getApplicationsBySetOfApplicantIDs(downloadedChatsApplicantIDs, authorizedUser.id, role));
  // TODO: из DialogueListItem можно в стейт записать весь диалог. Который потом передать в Dialog/Сhat. Но там свое скачивание. повторное
  // console.log('DialogueList')
  
  // useEffect(() => {
    // TODO: получить реф на дравер и устнаавливать стиль `top: ${windowScrollY}`
  //   console.log(drawerRef)

  //   if(!appsLoading && drawerOpen) {
  //     console.log(windowScrollY)
  //     console.log(drawerRef)
  //     console.log(drawerRef.current.firstElementChild.setAttribute)
  //     drawerRef.current.firstElementChild.setAttribute('style', `top: ${windowScrollY}`)
  //   } 
  // })

  if(appsLoading) {
    // console.log("качает заявки")
    return
  }

  if(appsError) {
    return <Error error={appsError}/>
  }

  const dialoguesList = getDialogueList(
    authorizedUser, 
    chatsCollSnapshot, 
    users, 
    appsCollSnapshot, 
    {setSelectedDialogue, setDialogueWindowOpen, handleDrawerClose}
  );

  // const windowScrollY = window.scrollY;

  return (
    <div 
      ref={drawerRef}
    >
      <Drawer 
        bodyStyle={{padding:"5px 0 10px 0"}}
        rootClassName="dialogues-list"
        placement="left"
        title={<DialogueSearch />}
        open={drawerOpen}
        mask={false}
        onClose={handleDrawerClose}
        getContainer={false}  
        zIndex={100}
        // onScroll={handleScroll}
      >
        <Card
          bordered={false}
          bodyStyle={{padding:"0", borderRadius:"0", boxShadow:"none"}}
        >
          {dialoguesList}
        </Card>
      </Drawer>
    </div>
  );
};

export default DialoguesList;
