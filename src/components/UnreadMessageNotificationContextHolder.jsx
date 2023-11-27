import React, { useContext, useEffect } from 'react';
import { notification } from 'antd';
import { audio, checkWillMessageBeShown, notificationGlobConfig } from '../models/income-message/income-message';
import { showUnredMessage } from '../models/income-message/income-message';
import { ProgramContext, WorkPageContext } from '../models/context';

const UnreadMessageNotificationContextHolder = ({dialoguesData, notificationsWillBeNotShown}) => {
  const { cleintsData } = useContext(WorkPageContext)
  const { authorizedUser } = useContext(ProgramContext);

  const [api, contextHolder] = notification.useNotification(notificationGlobConfig);

  useEffect(() => {

    // if(dialoguesData) {
      // показывает непрочитанное сообщение, кроме тех, которые уже были показаны, либо были получены оффлайн. Они записаны в notificationsWillBeNotShown
      dialoguesData.forEach(dialogue => {
        dialogue.messages.forEach(message => {
          // TODO: заменить сравнение на сравнение по айдишникам
          if(!message.sendState && (message.sender !== authorizedUser.name)) {
            if(checkWillMessageBeShown(dialogue.UID, message, notificationsWillBeNotShown)) {
              const client = cleintsData.find(client => client.UID === dialogue.UID);
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
   
  }, [dialoguesData, api, notificationsWillBeNotShown])

  return contextHolder;
}

export default UnreadMessageNotificationContextHolder;
