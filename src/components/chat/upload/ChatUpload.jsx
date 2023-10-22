import React, {useState, useEffect, useContext} from 'react';
import { Upload } from "antd";
import { PaperClipOutlined } from "@ant-design/icons"
import { uploadBytesResumable } from 'firebase/storage';
import { getFileRef } from '../../../models/firebase';
import {createNewMessageObject} from '../../../models/chat/message'
import { prepareAttachmentsInfo, addPathToDownload } from '../../../models/chat/attachment';
import SelectedAttachmentsPopup from './SelectedAttachmentsPopup';
import { ApplicationStatus, ChatAttachmentsContext, ProgramContext, WorkPageContext } from '../../../models/context';
import { sendMessage, chatPaths } from '../../../models/chat/chat-data-processing';
import { getFileExtension } from '../../../utils';

const ChatUpload = ({dialogueSnap, messageText, applicantId, setUploadingMessageWithAttachments, messages, disabled}) => {
  const [ chatUploadAttachmentList, setChatUploadAttachmentList ] = useState([])
  const [ modalIsOpened, setModalIsOpened ] = useState(false)
  const [ attachmentText, setAttachmentText] = useState(messageText)
  const { authorizedUser } = useContext(ProgramContext)
  const { curAppStatus } = useContext(ApplicationStatus);

  useEffect(()=>{
    setAttachmentText(messageText)
  },[messageText])

  const beforeUpload = (_attachment, newAttachmentList) => {
    setChatUploadAttachmentList([...chatUploadAttachmentList, ...newAttachmentList]);
    if(modalIsOpened === false) {
      setModalIsOpened(true) 
    }
    return false // прерываем дефолтную загрузку компонента
  }

  const handleModalCancel = () => {
    setModalIsOpened(false);
    setChatUploadAttachmentList([]);
  }
  
  const attachmentTextChange = (e) => {
    setAttachmentText(e.target.value);
  } 

  const handleSendWithAttachments = async () => {
    handleModalCancel();
    setAttachmentText("");
    
    let uploadingAttachments = prepareAttachmentsInfo(chatUploadAttachmentList); // TODO: сделать стейтом ??
    const newMessage = createNewMessageObject(attachmentText, authorizedUser.name, uploadingAttachments, true);
    setUploadingMessageWithAttachments( prev => { 
      return [...prev, newMessage];
    })

    let promises = [] 

    chatUploadAttachmentList.forEach((attachment, index) => {
      const uploadResult = uploadBytesResumable(getFileRef(`${chatPaths.storageAttachmentsFolder}/${applicantId}/${Date.now()}.${getFileExtension(attachment.name)}`), attachment);
      promises.push(uploadResult);
       uploadResult.on('state_changed', (snapshot) => {
        // const percentTransferred = getPercent(snapshot.bytesTransferred, snapshot.totalBytes);
      }, error => {
        // TODO: обработать ошибки.
      }, async () => {
        uploadingAttachments = addPathToDownload(index, uploadResult.snapshot.metadata.fullPath, uploadingAttachments);
      })
    })

    Promise.all(promises).then(() => {
      sendMessage(attachmentText, authorizedUser, dialogueSnap.ref, messages, uploadingAttachments);
    }).finally(() => {
      setUploadingMessageWithAttachments([]);
    })
  }

  return (
    <div className="chat-upload-button__container">
      <Upload
        disabled={disabled}
        showUploadList={false}
        beforeUpload={beforeUpload}
        fileList={chatUploadAttachmentList}
        multiple
      >
        <PaperClipOutlined 
          className={curAppStatus === 2 ? "interactive-icons interactive-icons-disabled" : "interactive-icons"} 
          style={{fontSize:"24px", marginRight: "5px"}}
        />
      </Upload>
      <ChatAttachmentsContext.Provider value={{chatUploadAttachmentList, handleModalCancel}}>
        <SelectedAttachmentsPopup 
          modalIsOpened={modalIsOpened}
          handleSendWithAttachments={handleSendWithAttachments}
          beforeUpload={beforeUpload}
          attachmentText={attachmentText}
          attachmentTextChange={attachmentTextChange}
        />
      </ChatAttachmentsContext.Provider>
    </div>
  );
};

export default ChatUpload;
