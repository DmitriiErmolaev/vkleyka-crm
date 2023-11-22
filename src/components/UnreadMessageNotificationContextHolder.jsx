import React, { useContext, useEffect } from 'react';
import { notification } from 'antd';
import { audio, checkWillMessageBeShown, notificationGlobConfig } from '../models/income-message/income-message';
import { showUnredMessage } from '../models/income-message/income-message';
import { WorkPageContext } from '../models/context';

const UnreadMessageNotificationContextHolder = ({dialoguesData, notificationsWillBeNotShown}) => {
  const { cleintsData } = useContext(WorkPageContext)
  const [api, contextHolder] = notification.useNotification(notificationGlobConfig);

  useEffect(() => {

    // if(dialoguesData) {
      // показывает непрочитанное сообщение, кроме тех, которые уже были показаны, либо были получены оффлайн. Они записаны в notificationsWillBeNotShown
      dialoguesData.forEach(dialogue => {
        dialogue.messages.forEach(message => {
          if(!message.sendState ) {
            if(checkWillMessageBeShown(dialogue.UID, message, notificationsWillBeNotShown)) {
              // const clientDocSNap = clientsCollSnapshot.docs.find(clientDocSnap => clientDocSnap.get('UID') === dialogue.UID) // TODO: Удалить, когда будет добавлено имя в объект диалога.
              // const client = clientDocSNap.data()
              // const applicantName = client?.name
              // ? client.name
              // : (
              //   client?.passports[0]?.first_name
              //       ? `${client.passports[0].first_name} ${client.passports[0].last_name}`
              //       : client?.UID
              //   )
              showUnredMessage(api, dialogue.name, message);
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
