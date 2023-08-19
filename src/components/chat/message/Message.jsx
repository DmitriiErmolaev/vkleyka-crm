import React from 'react';
import "../../../assets/chat/message.scss";
import { getAttachments } from '../../../models/chat/attachment';


const Message = ({styleClass, message, time, attachmentsIsLoading=false}) => {
  const attachments = message.attachments.length > 0 ? getAttachments(message.attachments, attachmentsIsLoading) : null;
  const senderName = message.sender !== "me" 
    ? (
        <div className="message__senderName">
          {message.sender}
        </div>
      ) 
    : null
    
  return (
    <li className="message__container">
      <div className={styleClass}>
        {senderName}
        {attachments}
        <p className="message__text">
          {message.content || <i>пустое сообщение</i>} 
        </p>
        <div className="message__status">
          <span className="message__created-time">{time}</span>
        </div>
      </div>
    </li>
  );
};

export default Message;
