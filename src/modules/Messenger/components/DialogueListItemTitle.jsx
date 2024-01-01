import React from 'react';
import {Badge} from 'antd';
import '../../../assets/chat/dialogue-list-item-title.scss'

const DialogueListItemTitle = ({applicantName, unreadMessagesNumber, messageCreationTime}) => {
  return (
   <div className="dialogue-list__card-title">
    <p className="card-title__client-name">{applicantName}</p>
    <div className="card-title__service-info">
      <Badge count={unreadMessagesNumber} classNames={{root:"card-title__unread", indicator:"unread__indicator"}}/>
      <div className="card-title__last-message-time">{messageCreationTime}</div>
    </div>
   </div>
  );
};

export default DialogueListItemTitle;
