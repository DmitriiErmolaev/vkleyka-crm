import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProgramContext, WorkPageContext } from '../../../models/context';
import showNotification from '../helpers/showNotification';

const UnreadMessagesNotificationSystem = ({chatsData, chatsLoading}) => {
  const { authorizedUser, role, notificationAPI } = useContext(ProgramContext);
  const { selectedDialogue, scrollMode, loginTime, clientsData  } = useContext(WorkPageContext)
  // const [ showedMessages, setShowedMessages ] = useState({});
  const showedMessages = useRef({});
  console.log(loginTime.toDate().getMinutes() + ':' + loginTime.toDate().getSeconds());
  console.log(showedMessages);
  
  useEffect(() => {
    if(chatsData) {
      chatsData.forEach(dialogue => {
        // TODO: убрать заплатку - проверку '&& dialogue.lastEdited', когда функционал этот заработает полностью - если в массиве будет хоть 1 сообщение - то lastEdited будет присутствовать. Сейчас массив может быть не пуст но lastEdited может не быть.
        if(dialogue.messages.length > 0 && dialogue.lastEdited) {
          if(dialogue.lastEdited.valueOf() < loginTime.valueOf()) return;
          //  время захода в систему больше времени сообщений в этом диалоге.
          const dialogIsOpened = dialogue.UID === selectedDialogue?.dialogue.UID;
          if(dialogIsOpened && !scrollMode) return; // мы в чате и он проскроллен. Не отображать нотификацию.
          dialogue.messages.forEach(message => {
            if(message.readBy && message.readBy.includes('operator')) return;
            if(message.time.valueOf() < loginTime.valueOf()) return;
            if(showedMessages.current[message.id]) return; // если прочитано или уже записано в объект showedMessages. Не отображать нотификацию
            // функция вызова нотификации
            const client = clientsData.find(client => client.UID === dialogue.UID);
            const clientName = message.sender === 'me' ? (dialogue?.name || client?.name || client?.phone || client?.email || client?.UID) :  message.sender;
            showNotification(notificationAPI, 'unreadMessage', {title : clientName, description: message.content,});
            showedMessages.current[message.id] = true;
          })
          // setShowedMessages(prev => {
          //   return dialogue.messages.reduce((acc, message) => {
          //     console.log(prev[message.id])
          //     if((message.readBy && message.readBy.includes('operator')) || prev[message.id]) return acc; // если прочитано или уже записано в объект showedMessages. Не отображать нотификацию
          //     // функция вызова нотификации
          //     const client = clientsData.find(client => client.UID === dialogue.UID);
          //     const clientName = message.sender === 'me' ? (dialogue?.name || client?.name || client?.phone || client?.email || client?.UID) :  message.sender;
          //     showNotification(notificationAPI, 'unreadMessage', {title : clientName, description: message.content,});
          //     acc[message.id] = message;
          //     return acc;
          //   }, {})
          // })
        }
      })
    }
  }, [chatsData, chatsLoading, clientsData, loginTime, notificationAPI, role, scrollMode, selectedDialogue?.dialogue.UID])

  return <></>;
};

export default UnreadMessagesNotificationSystem;
