import React, {useState, useEffect, useRef, useContext, useLayoutEffect} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import { Spin } from "antd";
import { getAllFieldsFromDocSnapshot } from '../../models/data-processing.js';
import { ApplicationStatus, ProgramContext, WorkPageContext} from '../../models/context.js';
import { getChatMessages } from '../../models/chat/message.js';
import { getChatQueryForApplication, readUnreadMessages } from '../../models/chat/chat-data-processing.js';
import { getCollectionFirstDocRef } from '../../utils.js';
import Error from '../error/Error.jsx';
import ChatActiveStatus from './ChatActiveStatus.jsx';
import ChatFooter from './ChatFooter.jsx';
import SelectComponent from '../selectors/SelectComponent.jsx';
import "../../assets/chat/chat.scss";

const Chat = ({ applicantId, clientApplicationsSnaps, source }) => {

  const [ uploadingMessageWithAttachments, setUploadingMessageWithAttachments ] = useState([]);
  const { authorizedUser, role } = useContext(ProgramContext)
  const allMessages = useRef(null);
  // NOTE: должен загрузиться только 1 docSnapshot в составе querySnapshot.
  const [ chatCollSnapshot, chatLoading, chatError ] = useCollection(getChatQueryForApplication(applicantId)) // нельзя запросить конкретный документ, потому что не знаем путь.
  const { scrollMode, setScrollMode, clientsData } = useContext(WorkPageContext);


  useLayoutEffect(() => {
    if(chatCollSnapshot && !scrollMode) {
      allMessages.current.scrollTop = 9999;
      // setScrolledToBottom(true)
    }
  },[chatCollSnapshot, scrollMode])

  useLayoutEffect(() => {
    if(chatCollSnapshot) {
      const messagesContainer = allMessages.current;

      const handleScroll = (e) => {
        if(messagesContainer.scrollTop + messagesContainer.clientHeight === messagesContainer.scrollHeight) {
          setScrollMode(false)
        } else {
          setScrollMode(true)
        }
      }
      messagesContainer.addEventListener('scroll', handleScroll);
      return () => messagesContainer.removeEventListener('scroll', handleScroll);
    }
  },[chatCollSnapshot])

  useLayoutEffect(() => {
    // чтобы при скролле в чате новые сообщения не скроллили его вниз, пока пользователь сам не проскроллит его. Зачем каждое новое сообщение будет скроллить чат самостоятельно.
    if(chatCollSnapshot && !scrollMode) {
      allMessages.current.scrollTop = 9999;
    }
  },[chatCollSnapshot, scrollMode])

  useLayoutEffect(() => {
    // прочитывание сообщения, если чат проскроллен вниз
    if(!chatLoading && role !== 'admin') {
      //TODO: рефакторить компонент, т.к. функции дублируются тут и перед рендерои. Спустить эффект вниз.. Вычисления сделать выше.
      const dialogueSnap = chatCollSnapshot.docs[0];
      const dialogue = getAllFieldsFromDocSnapshot(dialogueSnap)
      const unreadMessagesNumber = dialogue.messages.reduce((acc, message) => {
        if(message.readBy && !message.readBy.includes('operator')) {
          ++acc;
        }
        return acc;
      }, 0)
      // const scrollBottom = allMessages.current.scrollHeight - allMessages.current.scrollTop - allMessages.current.clientHeight
      if(!scrollMode && unreadMessagesNumber) {
        readUnreadMessages(dialogueSnap.ref, dialogue.messages);
      }
    }

  },[chatCollSnapshot, chatLoading, authorizedUser, scrollMode, role])

  if(chatLoading){
    return (
      <div style={{backgroundColor:"white", width:"100%", height:"400px", marginTop:"30px", boxShadow:"2px 2px 10px rgba(0, 0, 0, 0.10)"}}>
        <ul>
          <Spin size="large"/>
        </ul>
      </div>
    )
  }

  if(chatError) {
    return <Error error={chatError}/>
  }

  if(chatCollSnapshot.size !== 1) {
    // TODO:  ошибка. Т.к. должен вывестись только 1 чат.
  }

  const scrollHandle = (e) => {
    const scrollBottom = allMessages.current.scrollHeight - allMessages.current.scrollTop - allMessages.current.clientHeight
    if(Math.floor(scrollBottom) < 5 && unreadMessagesNumber && authorizedUser.role !== 'admin') {
      readUnreadMessages(dialogueSnap.ref, dialogue.messages);
    }
  }

  const dialogueSnap = chatCollSnapshot.docs[0];
  const dialogue = getAllFieldsFromDocSnapshot(dialogueSnap)
  const dialogueMessages = getChatMessages(dialogue.messages, uploadingMessageWithAttachments, authorizedUser, allMessages, scrollMode);
  const client = clientsData.find(user => {
    return user.UID === applicantId;
  })
  const applicantName = dialogue?.name || client?.name || client?.phone || client?.email || client?.UID || 'Аккаунт удален';

  const unreadMessagesNumber = dialogue.messages.reduce((acc, message) => {
    if(message.readBy && !message.readBy.includes('operator')) {
      ++acc;
    }
    return acc;
  }, 0)

  const operatorSelectDisabled = (role === 'operator' && (dialogue.assignedTo !== authorizedUser.id)) ? true : false;
  return (
    <div className="chat__container" >
      <div className={`chat__info ${client?.UID ? '' : 'chat__info__account-deleted' }`}>
        <div className="chat__personal">
          <p className="chat__applicant-name">
            {applicantName}
          </p>
          <p className="chat__applicant-id">
            <span>ID: </span>
            <span>{dialogue.UID}</span>
          </p>
        </div>
        <div className='chat__applicant-phone'>
          Тел: {client?.phone}
        </div>
        {source === 'application' ? (
            <div className="chat__empty"></div>
          ) : (
            <div className="chat__operator-info">
              <div className="operator-title">
                Отв-ный:
              </div>
              <div className="operator-name">
                <SelectComponent collectionType={"operators"} data={{dialogueSnap, clientApplicationsSnaps, assignedTo:dialogue.assignedTo, disabledProp:operatorSelectDisabled}}/>
              </div>
            </div>
          )
        }
        <ChatActiveStatus
          dialogueAssignedTo={dialogue.assignedTo}
          dialogueSnap={dialogueSnap}
          source={source}
          clientApplicationsSnaps={clientApplicationsSnaps}
        />
      </div>
      <ul className="chat__messages" ref={allMessages} onScroll={scrollHandle}>
        {dialogueMessages}
      </ul>
      <ChatFooter allMessages={allMessages} dialogueSnap={dialogueSnap} dialogue={dialogue} applicantId={applicantId} setUploadingMessageWithAttachments={setUploadingMessageWithAttachments}/>
    </div>
  );
};

export default Chat;
