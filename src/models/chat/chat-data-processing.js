import DateDivider from "../../components/chat/DateDivider";
import Message from "../../components/chat/Message";
import { Timestamp } from "firebase/firestore";

const addZero = (num) => {
  return (num < 10) ? `0${num}` : num;
}

const  getShortYear = (year) => {
  return +String(year).slice(2);
}

export const getMessageCreationTime = (s) => {
  const date = new Date(s * 1000);
  const hh = addZero(date.getHours());
  const mm = addZero(date.getMinutes());
  return `${hh}:${mm}`
}

export const getMessageCreationDate = (s) => {
  const date = new Date(s * 1000);
  const dd = `${addZero(date.getDate())}`;
  const mm = `${addZero(date.getMonth() + 1)}`;
  const yy = `${getShortYear(date.getFullYear())}`
  return `${dd}/${mm}/${yy}`;
}

const getClassNameForMessage = (sender) => {
  return (sender === "me") ? "message__content applicant" : "message__content operator";
}

const memoizedCreationDate = () => {
  let dateCached;
  
  return (creationDate) => {
    if (!dateCached || creationDate !== dateCached) {
      dateCached = creationDate;
      return true;
    } else {
      return false;
    }
  }
}

export const getChatMessages = (messages) => {
  // пустой контейнер, который заполнит диалоговое окно, пока нет новых сообщений.
  let result = [
    <li className="invisible-container">
      <div className="invisible-message"></div>
    </li>,
  ];

  const isDateNew = memoizedCreationDate();

  messages.forEach( message => {
    const messageCreationDate = getMessageCreationDate(message.time.seconds);
    const messageCreationTime = getMessageCreationTime(message.time.seconds);
    const classNameForMessage = getClassNameForMessage(message.sender);

    if(isDateNew(messageCreationDate)) {
      result.push(
        <DateDivider date={messageCreationDate} />
      )
    } 
   
    result.push(
      <Message 
        styleClass={classNameForMessage} 
        messageContent={message.content} 
        time={messageCreationTime} 
      />
    )
  })
  return result
}

export const createNewMessageObject = (text, operatorName, messageType) => {
  return {
    // attachments надо будет брать из стейта наверно позднее.
    attachments:[],
    content: text,
    sendState: -1,
    sender: operatorName,
    time: Timestamp.now(),
    type: messageType,
  }
}