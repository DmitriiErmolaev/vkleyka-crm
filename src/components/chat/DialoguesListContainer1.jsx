import React, {useContext, useRef, useLayoutEffect, useEffect, forwardRef, useState} from 'react';
import { Card, Drawer } from 'antd';
import { useCollection } from 'react-firebase-hooks/firestore';
import Error from '../error/Error';
import DialogueList from './DialoguesListContainer';
import DialogueListItem from './DialogueListItem';
import DialogueSearch from './DialogueSearch';
import '../../assets/chat/dialogue-list.scss';
import { getApplicationsBySetOfApplicantIDs } from '../../models/chat/dialogue-list/dialogue-list-data-processing';
import { ProgramContext } from '../../models/context';
import { dialogueListGroups } from '../../models/chat/dialogue-list/dialogue-list';
import { getAdminDialogueData } from '../../models/chat/dialogue-list/dialogue-list';
import { dialogListOperations } from '../../models/chat/dialogue-list/dialogue-list';
import { getDialogueList } from '../../models/chat/dialogue-list/dialogue-list';
import { getChatsQueryForDialoguesList } from '../../models/chat/chat-data-processing';


const DialoguesListContainer = ({drawerOpen, handleDrawerClose, selectedDialogue, setSelectedDialogue, setDialogueWindowOpen}) => {
  // TODO: прокинуть сюда лоадинг чатов и ждать пока они не загрузятся, но в этом время лист уже открытый и мы видим скелетон. То есть при нажатии на кнопку открывается глобал чат и грузится лист. При закрытии установить на загрытие лист, и следом закрыть глобал чат
  // const dialoguesListContainerRef = useRef(null)
  // const {authorizedUser, role} = useContext(ProgramContext)
  // const [searchFilters, setSearchFilters ] = useState('');


  // const downloadedChatsApplicantIDs = chatsCollSnapshot.docs.map(docSnap => {
  //   return docSnap.get('UID');
  // })
  // const [chatsCollSnapshot, chatsLoading, chatsError] = useCollection(getChatsQueryForDialoguesList(authorizedUser, searchFilters));
  // const [usersCollSnapshot, usersLoading, usersError] = useCollection(getUsersQuery());
  // TODO: из DialogueListItem можно в стейт записать весь диалог. Который потом передать в Dialog/Сhat. Но там свое скачивание. повторное



  // if(appsLoading) {
  //   return
  // }

  // if(appsError) {
  //   return <Error error={appsError}/>
  // }

  // const dialoguesList = getDialogueList(
  //   authorizedUser, 
  //   chatsCollSnapshot, 
  //   users, 
  //   appsCollSnapshot, 
  //   selectedDialogue,
  //   {setSelectedDialogue, setDialogueWindowOpen, handleDrawerClose}
  // );

  return (
    <div></div>
    // <DialogueList 
    //   chatsCollSnapshot={chatsCollSnapshot} 
    //   chatsLoading={chatsLoading} 
    //   chatsError={chatsError}
    //   drawerOpen={drawerOpen} 
    //   handleDrawerClose={handleDrawerClose} 
    //   selectedDialogue={selectedDialogue} 
    //   setSelectedDialogue={setSelectedDialogue} 
    //   setDialogueWindowOpen={setDialogueWindowOpen}
    //   setSearchFilters={setSearchFilters} 
    // />
  );
}

export default DialoguesListContainer;
