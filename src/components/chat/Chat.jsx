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

const Chat = ({ applicantName, applicantId, source, clientApplicationsSnaps }) => {
  const { authorizedUser, role } = useContext(ProgramContext)
  const allMessages = useRef(null);
  const [ uploadingMessageWithAttachments, setUploadingMessageWithAttachments ] = useState([]);
  // NOTE: должен загрузиться только 1 docSnapshot в составе querySnapshot.
  const [ chatCollSnapshot, chatLoading, chatError ] = useCollection(getChatQueryForApplication(applicantId));
  const { setUnreadMessagesToNotify } = useContext(WorkPageContext);

  useLayoutEffect(()=> {
    if(!chatLoading){
      allMessages.current.scrollTop = 9999;
    }
  },[chatLoading])

  useLayoutEffect(() => {
    if(!chatLoading) {
      //TODO: рефакторить компонент, т.к. функции дублируются тут и перед рендерои. Спустить эффект вниз.. Вычисления сделать выше.
      const dialogueSnap = chatCollSnapshot.docs[0];
      const dialogue = getAllFieldsFromDocSnapshot(chatCollSnapshot.docs[0])
      const unreadMessagesNumber = dialogue.messages.reduce((acc, message) => {
        if(message.sendState === 0 && message.sender !== authorizedUser.name) {
          ++acc;
        }
        return acc;
      }, 0)
      const scrollBottom = allMessages.current.scrollHeight - allMessages.current.scrollTop - allMessages.current.clientHeight
      if(!Math.floor(scrollBottom) && unreadMessagesNumber) {
        readUnreadMessages(dialogueSnap.ref, dialogue.messages, authorizedUser, setUnreadMessagesToNotify);
      }
    }

  },[chatCollSnapshot, chatLoading, authorizedUser, setUnreadMessagesToNotify])

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
    // console.log(unreadMessagesNumber)
    if(Math.floor(scrollBottom) < 5 && unreadMessagesNumber) {
      console.log("читка")
      readUnreadMessages(dialogueSnap.ref, dialogue.messages, authorizedUser, setUnreadMessagesToNotify);
    }
  }
  console.log(chatCollSnapshot.docs.map(elem => elem.data()))

  const dialogueSnap = chatCollSnapshot.docs[0];
  const dialogue = getAllFieldsFromDocSnapshot(chatCollSnapshot.docs[0])
  const dialogueMessages = getChatMessages(dialogue.messages, uploadingMessageWithAttachments, authorizedUser, allMessages);

  const unreadMessagesNumber = dialogue.messages.reduce((acc, message) => {
    if(message.sendState === 0 && message.sender !== authorizedUser.name) {
      ++acc;
    }
    return acc;
  }, 0)

  // const operatorSelectDisabled = (role === 'admin' || dialogueData.assignedTo === authorizedUser.id) ? false : true;
  const operatorSelectDisabled = (role === 'operator' && (dialogue.assignedTo !== authorizedUser.id)) ? true : false;
  return (
    <div className="chat__container" >
      <div className="chat__info">
        <div className="chat__personal">
          <p className="chat__applicant-name">
            {applicantName}
          </p>
          <p className="chat__applicant-id">
            <span>ID: </span>
            <span>{dialogue.UID}</span>
          </p>
        </div>
        {source === 'application'
          ? null
          : (
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
