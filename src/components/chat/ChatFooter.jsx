import React,{useState, useContext} from 'react';
import { Space, Input, Button } from 'antd';
import {SendOutlined } from "@ant-design/icons"
import ChatUpload from './upload/ChatUpload';
import { ApplicationStatus, ProgramContext, WorkPageContext } from '../../models/context';
import { sendMessage } from '../../models/chat/chat-data-processing';

const ChatFooter = ({allMessages, dialogueSnap, dialogue, applicantId, setUploadingMessageWithAttachments}) => {
  const {authorizedUser, role} = useContext(ProgramContext);
  const {curAppStatus} = useContext(ApplicationStatus); 
  const [text, setText] = useState("");
  const { setUnreadMessagesToNotify } = useContext(WorkPageContext); 

  const handleChange = (e)=> {
    setText(e.target.value);
  }

  const handleSend = async () => {
    if(!text) {
      return
    }
    await sendMessage(text, authorizedUser, dialogueSnap.ref, dialogue.messages, setUnreadMessagesToNotify)
    allMessages.current.scrollTop = 9999;
    setText("")
  }

  let disabled;
  if(role === 'admin') {
    disabled = curAppStatus === 2
  }
  if (role === 'operator') {
    disabled = dialogue.assignedTo !== authorizedUser.id || (curAppStatus === 2 && dialogue.assignedTo !== authorizedUser.id)
  }


  return (
    <div className="chat__footer" >
      <ChatUpload 
        dialogueSnap={dialogueSnap} 
        messageText={text} 
        applicantId={applicantId} 
        setUploadingMessageWithAttachments={setUploadingMessageWithAttachments} 
        messages={dialogue.messages}
        disabled={disabled}
      />
      <Space.Compact size="large" style={{width:"100%"}}>
        <Input 
          disabled={disabled}
          value={text} 
          onChange={handleChange} 
          onPressEnter={handleSend}
        />
        <Button  
          disabled={disabled}
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
  ) 
};

export default ChatFooter;
