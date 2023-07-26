import React, {useState, useEffect, useRef, useContext} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {Spin, Input, Button, Space } from "antd";
import {SendOutlined} from "@ant-design/icons"
import { getChatQuery } from '../../models/chat/chat.js';
import { getSingleFieldFromDocSnapshot, updateDocField } from '../../models/data-processing.js';
import "../../assets/chat/chat.scss";
import { findAuthorizedOperatorName } from '../../models/operator/operators-data-processing.js';
import { AdminsContext, UserContext} from '../../models/context.js';
import { getChatMessages, createNewMessageObject } from '../../models/chat/chat-data-processing.js';
import { nanoid } from 'nanoid';
import Error from '../error/Error.jsx';

const Chat = ({ applicantId }) => {
  const {user} = useContext(UserContext)
  const {admins} = useContext(AdminsContext)
  const [text, setText] = useState("")
  const allMessages = useRef(null);
  // NOTE: должен загрузиться только 1 docSnapshot в составе querySnapshot.
  const [chatCollSnapshot, chatLoading, chatError] = useCollection(getChatQuery(applicantId));

  useEffect(()=> {
    if(!chatLoading){
      allMessages.current.scrollTop = 9999;
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

  const handleChange = (e)=> {
    setText(e.currentTarget.value);
  }

  const handleSendMessage = async (e) => {
    if(!text) {
      return
    }
    const chatDocRef = chatCollSnapshot.docs[0].ref;
    const authorizedOperatorName = findAuthorizedOperatorName(admins, user);
    const newMessage = createNewMessageObject(text,authorizedOperatorName, "message");
    const newMessagesToUpload = [...messages, newMessage];
    await updateDocField(chatDocRef, "messages", newMessagesToUpload)
    setText("")
  }

  if(chatCollSnapshot.size !== 1) {
    // ошибка. Т.к. должен вывестись только 1 чат. Пока я так это понимаю.
  }

  const messages = getSingleFieldFromDocSnapshot(chatCollSnapshot.docs[0], "messages").map(message => {
    return {...message, key: nanoid()}
  })
  const chatMessages = getChatMessages(messages);

  return (
    <div className="chat-container" >
      <ul className="messages" ref={allMessages}>
        {chatMessages}
      </ul>
      <div className="input-panel" >
        <Space.Compact size="large" style={{width:"100%"}}>
          <Input 
            value={text} 
            onChange={handleChange} 
            onPressEnter={handleSendMessage}
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
            onClick={handleSendMessage}
          />
        </Space.Compact>
      </div>
    </div>
  );
};

export default Chat;
