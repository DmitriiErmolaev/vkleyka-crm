import React, { useContext, useEffect } from 'react';
import { notification } from 'antd';
import { audio, checkWillMessageBeShown, notificationGlobConfig } from '../models/income-message/income-message';
import { showUnredMessage } from '../models/income-message/income-message';
import { ProgramContext, WorkPageContext } from '../models/context';

const UnreadMessageNotificationContextHolder = ({chatsData, notificationsWillBeNotShown, selectedDialogue}) => {
  const { clientsData } = useContext(WorkPageContext)
  const { authorizedUser } = useContext(ProgramContext);
  const [api, contextHolder] = notification.useNotification(notificationGlobConfig);

  useEffect(() => {

    // if(chatsData) {
      // показывает непрочитанное сообщение, кроме тех, которые уже были показаны, либо были получены оффлайн. Они записаны в notificationsWillBeNotShown
      chatsData.forEach(dialogue => {
        
        if(selectedDialogue?.dialogue.UID === dialogue.UID) {
          // чтобы нотификации не приходили из диалога, кототрый отрыт.
          return;
        }
        dialogue.messages.forEach(message => {
          // TODO: заменить сравнение на сравнение по айдишникам
          if(!message.sendState && (message.sender !== authorizedUser.name)) {
            if(checkWillMessageBeShown(dialogue.UID, message, notificationsWillBeNotShown, selectedDialogue)) {
              const client = clientsData.find(client => client.UID === dialogue.UID);
              // const applicantName = client?.name
              // ? client.name
              // : (
              //   client?.passports[0]?.first_name
              //       ? `${client.passports[0].first_name} ${client.passports[0].last_name}`
              //       : client?.UID
              //   )
              const clientName = dialogue?.name || client?.name || client.passports[0].first_name || client.UID

              showUnredMessage(api, clientName, message);
              audio.play()
            } else {
              return;
            }
          }
        })
      })
    // }
  }, [chatsData, api, notificationsWillBeNotShown, authorizedUser.name, clientsData, selectedDialogue])

  return contextHolder;
}

export default UnreadMessageNotificationContextHolder;
