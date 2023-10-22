import React, {useState, useRef, useEffect, useContext} from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Head from "../components/layout/Head";
import Aside from "../components/layout/Aside";
import GlobalChat from "../components/chat/GlobalChat";
import '../assets/workpage.scss';
import '../assets/notification/notification.scss';
import { useCollection } from "react-firebase-hooks/firestore";
import { getClientsQuery } from "../models/clients/clients";
import Error from "../components/error/Error";
import { ProgramContext, WorkPageContext } from "../models/context";
import { getChatsQueryForDialoguesList } from "../models/chat/chat-data-processing";
import UnreadMessageNotificationContextHolder from "../components/UnreadMessageNotificationContextHolder";
const {Content} = Layout;

const WorkPage = () => {
  const [ drawerOpen, setDrawerOpen ] = useState(false);
  const { authorizedUser, role } = useContext(ProgramContext);
  const [ searchFilters, setSearchFilters ] = useState('');
  const contentRef = useRef(null);
  const [ notificationsWillBeNotShown, setNotificationsWillBeNotShown ] = useState(null);
  const [ clientsCollSnapshot, clientsLoading, clientsError ] = useCollection(getClientsQuery());
  const [ chatsCollSnapshot, chatsLoading, chatsError ] = useCollection(getChatsQueryForDialoguesList(authorizedUser, searchFilters));

  useEffect(() => {
    if(!chatsLoading) {
      const dialoguesData = chatsCollSnapshot.docs.map(docSnap => {
        return docSnap.data();
      })
      // cохраняем в стейт те сообщения, которые не были прочитаны, пока визовик был оффлайн и новые непрочитанные, которые визовик еще не прочитал.
      // чтобы при получении новых сообщений, текущие непрочитанные не показывались повторно.
      setNotificationsWillBeNotShown(dialoguesData.reduce((acc, dialogue) => {
        dialogue.messages.forEach(message => {
          if(!message.sendState) {
            //сохраняем message, на случай если в будующем нужно будет повторно показать непрочитанное оповещение
            acc.push({key: `${dialogue.UID}-${message.time.nanoseconds}`, message})
            // acc.push({id: message.id, message})
          }
        })
        return acc;
      }, []))
    }
  },[chatsCollSnapshot, chatsLoading ])

  if (clientsLoading || chatsLoading) {
    return 
  }

  if (clientsError || chatsError) {
    return <Error error={clientsError || chatsError}/>
  }

  const handleMenuSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
    if (key === "/chat") setDrawerOpen((prev) => !prev)
  }
  
  const globalChatComponent = drawerOpen ? <GlobalChat drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} /> : null
  const dialoguesData = chatsCollSnapshot.docs.map(docSnap => {
    return docSnap.data();
  })

  return (
    <WorkPageContext.Provider value={{clientsCollSnapshot, chatsCollSnapshot, chatsLoading }}>
        {notificationsWillBeNotShown && <UnreadMessageNotificationContextHolder dialoguesData={dialoguesData} notificationsWillBeNotShown={notificationsWillBeNotShown}/>}
      <Layout className="workpage">
        <Head />
        <Layout className="main" hasSider>
          <Aside handleMenuSelect={handleMenuSelect} totalUnreadMessages={notificationsWillBeNotShown?.length}/>
          <Content 
            ref={contentRef}
            className="content"
          >
            {globalChatComponent}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </WorkPageContext.Provider>
  )
}

export default WorkPage;
