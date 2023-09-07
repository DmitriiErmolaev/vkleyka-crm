import React,{useState, useContext} from 'react';
import { Space, Input, Button } from 'antd';
import {SendOutlined } from "@ant-design/icons"
import ChatUpload from './upload/ChatUpload';
import { ApplicationStatus, ProgramContext } from '../../models/context';
import { sendMessage } from '../../models/chat/chat-data-processing';

const ChatFooter = ({dialogueSnap, dialogueData, applicantId, setUploadingMessageWithAttachments}) => {
  const {authorizedUser} = useContext(ProgramContext);
  const {curAppStatus} = useContext(ApplicationStatus); 
  const [text, setText] = useState("");

  const handleChange = (e)=> {
    setText(e.target.value);
  }

  const handleSend = async () => {
    if(!text) {
      return
    }
    await sendMessage(text, authorizedUser.name, dialogueSnap.ref, dialogueData.messages)
    setText("")
  }

  return (
    <div className="chat__footer" >
      <ChatUpload 
        dialogueSnap={dialogueSnap} 
        messageText={text} 
        applicantId={applicantId} 
        setUploadingMessageWithAttachments={setUploadingMessageWithAttachments} 
        messagesData={dialogueData.messages}
      />
      <Space.Compact size="large" style={{width:"100%"}}>
        <Input 
          disabled={curAppStatus === 2}
          value={text} 
          onChange={handleChange} 
          onPressEnter={handleSend}
        />
        <Button  
          disabled={curAppStatus === 2}
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
