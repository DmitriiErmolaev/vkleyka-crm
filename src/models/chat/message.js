import { addZero } from "../../utils";
import { getShortYear } from "../../utils";
import DateDivider from "../../components/chat/message/DateDivider";
import Message from "../../components/chat/message/Message";
import { nanoid } from "nanoid";
import { Timestamp } from "firebase/firestore";

const getClassNameForMessage = (sender) => {
  return (sender === "me") ? "message__content applicant" : "message__content operator";
}

export const getMessageCreationTime = (dateObject) => {
  // const date = timestamp.toDate(); // возвращает js Date object с потерей точности до секунд.
  const hh = addZero(dateObject.getHours());
  const mm = addZero(dateObject.getMinutes());
  return `${hh}:${mm}`
}

const getMessageCreationDate = (s) => {
  const date = new Date(s * 1000);
  const dd = `${addZero(date.getDate())}`;
  const mm = `${addZero(date.getMonth() + 1)}`;
  const yy = `${getShortYear(date.getFullYear())}`
  return `${dd}/${mm}/${yy}`;
}

const memoizedCreationDate = () => {
  let dateCached;
  
  return creationDate => {
    if (!dateCached || (creationDate !== dateCached)) {
      dateCached = creationDate;
      return true;
    } else {
      return false;
    }
  }
}

export const getChatMessages = (messages, uploadingMessageWithAttachments, authorizedUser, allMessages) => {
  // пустой контейнер, который заполнит диалоговое окно, пока нет новых сообщений.
  // рефакторить в reduce.
  let result = [
    <li key={"invisible-container"} className="invisible-container">
      <div className="invisible-message"></div>
    </li>,
  ];

  const isDateNew = memoizedCreationDate();
  let unreadMessageExist = false;

  messages.forEach((message) => {
    const messageCreationDate = getMessageCreationDate(message.time.seconds);
    const messageCreationTime = getMessageCreationTime(message.time.toDate()); // метод toDate возвращает js Date object с потерей точности до секунд.
    const classNameForMessage = getClassNameForMessage(message.sender);

    if(isDateNew(messageCreationDate)) {
      result.push(
        <DateDivider key={messageCreationDate} date={messageCreationDate} />
      )
    } 

    // const scrollBottom = allMessages?.current?.scrollHeight - allMessages?.current?.scrollTop - allMessages?.current?.clientHeight
  
    if(message.sendState === 0 && !unreadMessageExist && message.sender !== authorizedUser.name) {
      result.push(<div key="unread-notification" className="unread-notification">Непрочитанные сообщения</div>)
      unreadMessageExist = true;
    }
    
    result.push(
      <Message 
        key={message.time.toDate().getTime()}
        styleClass={classNameForMessage} 
        message={message} 
        time={messageCreationTime} 
      />
    )
  })

  if( uploadingMessageWithAttachments.length > 0 ) {
    uploadingMessageWithAttachments.forEach((message, index) => {
      const messageCreationTime = getMessageCreationTime(new Date(message.time));
      result.push(
        <Message 
          key={message.time}
          styleClass={"message__content operator"}
          message={message} 
          time={messageCreationTime} 
          attachmentsIsLoading={true}
        />
      )
    })
  }
  return result
}

export const createNewMessageObject = (text, operatorName, attachmentsArray = [], isSttachmentsLoading) => {
  const time = isSttachmentsLoading ? Date.now() : Timestamp.now(); // для отображения загружающегося сообщения в чате на фронте или сообщения. принятого из firebase.
  return {
    id: nanoid(),
    attachments: attachmentsArray,
    content: text,
    sendState: 0,
    sender: operatorName,
    time: time,
    type: "message",
  }
}
