import React, {useContext, useRef, useLayoutEffect, useEffect, forwardRef} from 'react';
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


const DialoguesList = ({drawerOpen, handleDrawerClose, chatsCollSnapshot, users, selectedDialogue, setSelectedDialogue, setDialogueWindowOpen, contentScrollTop, setSearchFilters}) => {
  // TODO: прокинуть сюда лоадинг чатов и ждать пока они не загрузятся, но в этом время лист уже открытый и мы видим скелетон. То есть при нажатии на кнопку открывается глобал чат и грузится лист. При закрытии установить на загрытие лист, и следом закрыть глобал чат
  const dialoguesListContainerRef = useRef(null)
  const {authorizedUser, role} = useContext(ProgramContext)

  const downloadedChatsApplicantIDs = chatsCollSnapshot.docs.map(docSnap => {
    return docSnap.get('UID');
  })

  const [appsCollSnapshot, appsLoading, appsError] = useCollection(getApplicationsBySetOfApplicantIDs(downloadedChatsApplicantIDs, authorizedUser.id, role));
  // TODO: из DialogueListItem можно в стейт записать весь диалог. Который потом передать в Dialog/Сhat. Но там свое скачивание. повторное

  useLayoutEffect(() => {
    if (!appsLoading) {
      dialoguesListContainerRef.current.style.top = `${window.scrollY}px` 
    }
  }, [appsLoading])

  if(appsLoading) {
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
    selectedDialogue,
    {setSelectedDialogue, setDialogueWindowOpen, handleDrawerClose}
  );

  return (
    <div
      ref={dialoguesListContainerRef}
      style={{position:'relative'}}
    >
      <Drawer 
        bodyStyle={{padding:"5px 0 10px 0"}}
        rootClassName="dialogues-list"
        placement="left"
        title={<DialogueSearch setSearchFilters={setSearchFilters}/>}
        open={drawerOpen}
        mask={false}
        onClose={handleDrawerClose}
        getContainer={false}  
        zIndex={100}
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
}

export default DialoguesList;
