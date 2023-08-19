import React from 'react';
import { FileFilled } from '@ant-design/icons';
import "../../../assets/chat/chat-upload-file.scss";

const UploadAttachment = ({attachment}) => {
  return (
    <div className="chat-upload-attachment__container">
        <FileFilled style={{fontSize:"40px", color:"#4DA1FF", marginRight:"10px"}}/>
        <div className="chat-upload-attachment__info">
          <p className="chat-upload-attachment__name">{attachment.name}</p>
          <p className="chat-upload-attachment__size">{`${attachment.size} bytes`}</p>
        </div>
    </div>
  );
};

export default UploadAttachment;
