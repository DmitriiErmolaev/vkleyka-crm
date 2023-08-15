import React, {useState, useEffect, useRef, useContext} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {Spin, Input, Button, Space, Upload, Modal, Tag } from "antd";
import {SendOutlined, PaperClipOutlined, CheckCircleOutlined, CloseCircleOutlined  } from "@ant-design/icons"
import { getChatQueryForApplication } from '../../models/chat/chat-data-processing.js';
import { getAllFieldsFromDocSnapshot, updateDocField } from '../../models/data-processing.js';
import "../../assets/chat/chat.scss";
import { findAuthorizedOperatorName } from '../../models/operator/operators-data-processing.js';
import { ProgramContext} from '../../models/context.js';
import { getChatMessages } from '../../models/chat/message.js';
import Error from '../error/Error.jsx';
import ChatUpload from './upload/ChatUpload.jsx';
import ChatActiveStatus from './ChatActiveStatus.jsx';
import { prepareAttachmentsInfo } from '../../models/chat/chat-data-processing.js';
import { sendMessage } from '../../models/chat/chat-data-processing.js';
import { getCollectionFirstDocRef } from '../../utils.js';
import { chatPaths } from '../../models/chat/chat-data-processing.js';

const Chat = ({applicantName, applicantId }) => {
  const {authorizedOperator, admins} = useContext(ProgramContext)
  const [text, setText] = useState("")
  const allMessages = useRef(null);
  const [uploadingMessageWithAttachments, setUploadingMessageWithAttachments] = useState([]);
  // NOTE: должен загрузиться только 1 docSnapshot в составе querySnapshot.
  const [chatCollSnapshot, chatLoading, chatError] = useCollection(getChatQueryForApplication(applicantId));


  useEffect(()=> {
    if(!chatLoading){
      allMessages.current.scrollTop = 9999;
    }
  })

  const handleChange = (e)=> {
    setText(e.target.value);
  }

  const handleSend = async () => {
    if(!text) {
      return
    }
    await sendMessage(text, authorizedOperator.name, chatDocRef, dialogueData.messages)
    setText("")
  }


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

  const chatDocRef = getCollectionFirstDocRef(chatCollSnapshot); 
  const dialogueData = getAllFieldsFromDocSnapshot(chatCollSnapshot.docs[0])
  const dialogueMessages = getChatMessages(dialogueData.messages, uploadingMessageWithAttachments);

  return (
    <div className="chat__container" >
      <div className="chat-info">
        <div className="applicant-name">
          {applicantName}
        </div>
        <div className="operator-info">
          <div className="operator-title">
            Визовик:
          </div>
          <div className="operator-name">
            {authorizedOperator.name}
          </div>
        </div>
        <div className="dialogue-is-active-status">
          <ChatActiveStatus dialogueAssignedTo={dialogueData.assignedTo} dialogueRef={chatCollSnapshot.docs[0].ref}/>
        </div>
      </div>
      <ul className="chat-messages" ref={allMessages}>
        {dialogueMessages}
      </ul>
      <div className="chat-footer" >
        <ChatUpload 
          chatDocRef={chatDocRef} 
          messageText={text} 
          applicantId={applicantId} 
          setUploadingMessageWithAttachments={setUploadingMessageWithAttachments} 
          messagesData={dialogueData.messages}
        />
        <Space.Compact size="large" style={{width:"100%"}}>
          <Input 
            value={text} 
            onChange={handleChange} 
            onPressEnter={handleSend}
          />
          <Button  
            icon={
              <SendOutlined 
                style={{
                  fontSize:"24px", 
                  color:"#4DA1FF"
                }}
              />
            }
            onClick={handleSend}
          />
        </Space.Compact>
      </div>
    </div>
  );
};

export default Chat;
