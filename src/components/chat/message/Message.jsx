import React from 'react';
import "../../../assets/chat/message.scss";
import { getAttachments } from '../../../models/chat/attachment';
import { getFileRef } from '../../../models/firebase';
import { getDownloadURL } from 'firebase/storage';

const Message = ({styleClass, message, time, attachmentsIsLoading=false}) => {
  // пока грузятся документы, рисовать исходя из данных на фронте,  а не из message.
  // надо сюда эти данные передать в таком же формате как и message, +прогресс
  // запускать этот компонент принудительно, т.к. сообщение в чат не отправится пока все доки не загрузятся.
  
  const attachments = message.attachments.length > 0 ? getAttachments(message.attachments, attachmentsIsLoading) : null; // оцпиональная цепочка на случай, если сообщение вообще не содержит поля attachment. На пример в сообщении с типом ThankYouMEssage.
  
  return (
    <li className="message__container">
      <div className={styleClass}>
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
