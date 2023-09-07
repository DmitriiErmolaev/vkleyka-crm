import React, {useState, useEffect, useRef, useContext} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import { Spin } from "antd";
import { getAllFieldsFromDocSnapshot } from '../../models/data-processing.js';
import { ApplicationStatus, ProgramContext} from '../../models/context.js';
import { getChatMessages } from '../../models/chat/message.js';
import { getChatQueryForApplication, readUnreadMessages } from '../../models/chat/chat-data-processing.js';
import { getCollectionFirstDocRef } from '../../utils.js';
import Error from '../error/Error.jsx';
import ChatActiveStatus from './ChatActiveStatus.jsx';
import ChatFooter from './ChatFooter.jsx';
import SelectComponent from '../selectors/SelectComponent.jsx';
import "../../assets/chat/chat.scss";

const Chat = ({ applicantName, applicantId, unreadMessagesExist, source, clientApplicationsSnaps }) => {
  const {authorizedUser, role} = useContext(ProgramContext)
  const allMessages = useRef(null);
  const [uploadingMessageWithAttachments, setUploadingMessageWithAttachments] = useState([]);
  // NOTE: должен загрузиться только 1 docSnapshot в составе querySnapshot. 
  const [chatCollSnapshot, chatLoading, chatError] = useCollection(getChatQueryForApplication(applicantId));

  useEffect(()=> {
    if(!chatLoading){
      allMessages.current.scrollTop = 9999;
    }
  })

  useEffect(() => {
    if(unreadMessagesExist && !chatLoading && !chatError) {
      // при размонтировании компонента, возвращаемая функция меняет статус всех сообщений на 1 ("прочитано") и отправлет в бд.
      return () => {
        const readMessages = dialogueData.messages.map(message => {
          if(message.sendState === 0) {
            return {...message, sendState: 1};
          }
          return message;
        })
        readUnreadMessages(dialogueSnap.ref, readMessages);
      }
    }
  })

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

  const dialogueSnap = chatCollSnapshot.docs[0]; 
  const dialogueData = getAllFieldsFromDocSnapshot(chatCollSnapshot.docs[0])
  const dialogueMessages = getChatMessages(dialogueData.messages, uploadingMessageWithAttachments);

  // const operatorSelectDisabled = (role === 'admin' || dialogueData.assignedTo === authorizedUser.id) ? false : true;
  const operatorSelectDisabled = (role === 'operator' && (dialogueData.assignedTo !== authorizedUser.id)) ? true : false;
  return (
    <div className="chat__container" >
      <div className="chat__info">
        <div className="chat__applicant-name">
          {applicantName}
        </div>
        {source === 'application'
          ? null
          : (
              <div className="chat__operator-info">
                <div className="operator-title">
                  Отв-ный: 
                </div>
                <div className="operator-name">
                  <SelectComponent collectionType={"operators"} data={{dialogueSnap, clientApplicationsSnaps, assignedTo:dialogueData.assignedTo, disabledProp:operatorSelectDisabled}}/>
                </div>
              </div>
            )
        }
        <ChatActiveStatus 
          dialogueAssignedTo={dialogueData.assignedTo} 
          dialogueSnap={dialogueSnap}
          source={source}
          clientApplicationsSnaps={clientApplicationsSnaps}
        />
      </div>
      <ul className="chat__messages" ref={allMessages}>
        {dialogueMessages}
      </ul>
      <ChatFooter dialogueSnap={dialogueSnap} dialogueData={dialogueData} applicantId={applicantId} setUploadingMessageWithAttachments={setUploadingMessageWithAttachments}/>
    </div>
  );
};

export default Chat;
