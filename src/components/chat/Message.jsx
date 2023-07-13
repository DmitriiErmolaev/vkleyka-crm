import React from 'react';
import "../../assets/chat/message.scss";

const Message = ({styleClass, messageContent, time}) => {
  return (
    <li className="message__container">
      <div className={styleClass}>
        <p className="message__text">
          {messageContent || <i>пустое сообщение</i>}
        </p>
        <div className="message__status">
          <span className="message__created-time">{time}</span>
        </div>
      </div>
    </li>
  );
};

export default Message;