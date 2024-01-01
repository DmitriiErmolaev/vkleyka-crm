import { getClassNameForMessage } from "./getClassNameForMessage";
import { getMessageCreationTime } from "./getMessageCreationTime";
import { memoizedCreationDate } from "./memoizedCreationDate";
import { getMessageCreationDate } from './getMessageCreationDate';
import DateDivider from "../components/DateDivider";
import Message from "../components/Message";

export const getChatMessages = (messages, uploadingMessageWithAttachments, authorizedUser, allMessages, scrollMode) => {
  // пустой контейнер, который заполнит диалоговое окно, пока нет новых сообщений.
  // рефакторить в reduce.
  let result = [
    <li key={"invisible-container"} className="invisible-container">
      <div className="invisible-message"></div>
    </li>,
  ];
  if (!messages.length) {
    return result;
  }
  const isDateNew = memoizedCreationDate();
  // let unreadMessageGroupAdded = false;
  let unreadMessages = []

  messages.forEach((message) => {
    const messageCreationDate = getMessageCreationDate(message.time.seconds);
    const messageCreationTime = getMessageCreationTime(message.time.toDate()); // метод toDate возвращает js Date object с потерей точности до секунд.
    const classNameForMessage = getClassNameForMessage(message.sender);

    if(isDateNew(messageCreationDate)) {
      result.push(
        <DateDivider key={messageCreationDate} date={messageCreationDate} />
      )
    }

    if(message.readBy && !message.readBy.includes('operator')) {
      if(authorizedUser.role === 'admin' || (authorizedUser.role !== 'admin' && scrollMode)) {
        unreadMessages.push(
          <Message
            key={message.id}
            styleClass={classNameForMessage}
            message={message}
            time={messageCreationTime}
          />
        )
      }
      return;
    }

    // if(message.readBy && !message.readBy.includes('operator') && !unreadMessageGroupAdded) {
    //   if(authorizedUser.role === 'admin' || (authorizedUser.role !== 'admin' && scrollMode)) {
    //     result.push(<div key="unread-notification" className="unread-notification">Непрочитанные сообщения</div>)
    //     unreadMessageGroupAdded = true;
    //   }
    // }

    result.push(
      <Message
        key={message.id}
        styleClass={classNameForMessage}
        message={message}
        time={messageCreationTime}
      />
    )
  })

  if (unreadMessages.length > 0) {
    result.push(
      <div className='unread-messages__container'>
        <div key="unread-notification" className="unread-notification">Непрочитанные сообщения</div>
        {unreadMessages}
      </div>
    )
  }

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
