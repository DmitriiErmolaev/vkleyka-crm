import React, {useState, useRef, useEffect, useContext} from "react";
import {ConfigProvider, Layout} from "antd";
import {Outlet} from "react-router-dom";
import Head from "../components/layout/head/Head";
import Aside from "../components/layout/sider/Aside";
import GlobalChat from "../components/chat/GlobalChat";
import '../assets/workpage.scss';
import '../assets/notification/notification.scss';
import { useCollection, useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { getClientsQuery } from "../models/clients/clients";
import Error from "../components/error/Error";
import { ProgramContext, WorkPageContext } from "../models/context";
import { getChatsQueryForDialoguesList } from "../models/chat/chat-data-processing";
import UnreadMessageNotificationContextHolder from "../components/UnreadMessageNotificationContextHolder";
import GlobalDataDownload from "../components/GlobalDataDownload";
const {Content} = Layout;

const CLIENTS_QUERY = getClientsQuery();

const WorkPage = () => {
  const [ pageCount, setPageCount ] = useState(1);
  const [ chatListOpen, setChatListOpen] = useState(false);
  const [ appsSearch, setAppsSearch ] = useState('');
  const [ chatsSearchFilter, setChatsSearchFilter ] = useState('');
  const [ notificationsWillBeNotShown, setNotificationsWillBeNotShown ] = useState(null);
  const [ selectedDialogue, setSelectedDialogue ] = useState(null);
  const [ scrollMode, setScrollMode ] = useState(false)
  const dialogueForApplication = useRef(null);
  const { authorizedUser, role } = useContext(ProgramContext);
  const contentRef = useRef(null);
  const [ clientsData, clientsLoading, clientsError, clientsCollSnapshot ] = useCollectionData(CLIENTS_QUERY);
  const [ chatsData, chatsLoading, chatsError, chatsCollSnapshot ] = useCollectionData(getChatsQueryForDialoguesList(authorizedUser, chatsSearchFilter));

  useEffect(() => {
    if(!chatsLoading) {
      if (role === 'admin') return;
      // cохраняем в стейт те сообщения, которые не были прочитаны, пока визовик был оффлайн и новые непрочитанные, которые визовик еще не прочитал.
      // чтобы при получении новых сообщений, текущие непрочитанные не показывались повторно.
      setNotificationsWillBeNotShown(chatsData.reduce((acc, dialogue) => {
        const dialogIsOpened = dialogue.UID === selectedDialogue?.dialogue.UID;
        if(dialogIsOpened && !scrollMode) return acc;
        dialogue.messages.forEach(message => {
          if(message.readBy && !message.readBy.includes('operator')) { // если в массиве нет 'operator' значит сообщение отправил не визовик и он его не прочитал.
            // сохраняем message, на случай если в будующем нужно будет повторно показать непрочитанное оповещение
            acc.push({id: message.id, message})
          }
        })
        return acc;
      }, []))
    }
  },[chatsData, chatsLoading, authorizedUser.name, scrollMode, selectedDialogue?.dialogue.UID, role ])

  if(clientsLoading) {
    return
  }

  if (clientsError || chatsError) {
    return <Error error={clientsError || chatsError}/>
  }

  const handleMenuSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
    if (key === "/chat") {
      setChatListOpen((prev) => !prev)
    }
  }

  return (
    <WorkPageContext.Provider value={{clientsData, chatsCollSnapshot, chatsData, chatsLoading, chatsSearchFilter, setChatsSearchFilter, appsSearch, setAppsSearch, unreadMessagesArray: notificationsWillBeNotShown, pageCount, setPageCount, scrollMode, setScrollMode, selectedDialogue, setSelectedDialogue, dialogueForApplication  }}>
      {(!chatsLoading && notificationsWillBeNotShown && role === 'operator') ? <UnreadMessageNotificationContextHolder chatsData={chatsData} notificationsWillBeNotShown={notificationsWillBeNotShown} selectedDialogue={selectedDialogue}/> : null}
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
            <Aside handleMenuSelect={handleMenuSelect} chatListOpen={chatListOpen}/>
            <GlobalDataDownload >
              <Content
                ref={contentRef}
                className="content"
              >
                <GlobalChat
                  chatListOpen={chatListOpen}
                  setChatListOpen={setChatListOpen}
                  selectedDialogue={selectedDialogue}
                  setSelectedDialogue={setSelectedDialogue}
                />
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
