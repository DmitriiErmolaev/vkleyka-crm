import React, {useState, useRef, useEffect, useContext} from "react";
import {ConfigProvider, Layout} from "antd";
import {Outlet} from "react-router-dom";
import Head from "../components/layout/head/Head";
import Aside from "../components/layout/sider/Aside";
import GlobalChat from "../components/chat/GlobalChat";
import '../assets/workpage.scss';
import '../assets/notification/notification.scss';
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { getClientsQuery } from "../models/clients/clients";
import Error from "../components/error/Error";
import { ProgramContext, WorkPageContext } from "../models/context";
import { getChatsQueryForDialoguesList } from "../models/chat/chat-data-processing";
import UnreadMessageNotificationContextHolder from "../components/UnreadMessageNotificationContextHolder";
import GlobalDataDownload from "../components/GlobalDataDownload";
const {Content} = Layout;

const CLIENTS_QUERY = getClientsQuery();

const WorkPage = () => {
  const [ drawerOpen, setDrawerOpen ] = useState(false);
  const [  chatsSearchFilter, setChatsSearchFilter ] = useState('');
  const [ appsSearch, setAppsSearch ] = useState({text: '', mode: false});
  const [ notificationsWillBeNotShown, setNotificationsWillBeNotShown ] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const { authorizedUser, role } = useContext(ProgramContext);
  const contentRef = useRef(null);
  const [ cleintsData, clientsLoading, clientsError, clientsCollSnapshot ] = useCollectionData(CLIENTS_QUERY);
  const [ chatsCollSnapshot, chatsLoading, chatsError ] = useCollection(getChatsQueryForDialoguesList(authorizedUser, chatsSearchFilter));
  console.log(tableData)
  
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

  if(clientsLoading) {
    return
  }

  if (clientsError || chatsError) {
    return <Error error={clientsError || chatsError}/>
  }

  const handleMenuSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
    if (key === "/chat") {
      setDrawerOpen((prev) => !prev)
    }
  }

  const globalChatComponent = drawerOpen ? <GlobalChat drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} /> : null
  const dialoguesData = chatsCollSnapshot?.docs.map(docSnap => {
    return docSnap.data();
  })

  return (
    <WorkPageContext.Provider value={{cleintsData, chatsCollSnapshot, chatsLoading, chatsSearchFilter, setChatsSearchFilter, appsSearch, setAppsSearch, unreadMessagesArray: notificationsWillBeNotShown, tableData, setTableData, lastDoc, setLastDoc }}>
      {(!chatsLoading && notificationsWillBeNotShown && role === 'operator') ? <UnreadMessageNotificationContextHolder dialoguesData={dialoguesData} notificationsWillBeNotShown={notificationsWillBeNotShown}/> : null}
      <ConfigProvider
        theme={{
          token: {
            colorBgLayout: '#F8F8F8',
          },
        }}
      >
        <Layout className="workpage">
          <Head />
          <Layout className="main" hasSider>
            <Aside handleMenuSelect={handleMenuSelect} drawerOpen={drawerOpen}/>
            <GlobalDataDownload >
              <Content
                ref={contentRef}
                className="content"
              >
                {globalChatComponent}
                <Outlet />
              </Content>
            </GlobalDataDownload>
          </Layout>
        </Layout>
      </ConfigProvider>
    </WorkPageContext.Provider>
  )
}

export default WorkPage;
