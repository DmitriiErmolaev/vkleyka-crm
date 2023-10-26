import React, { useContext, useEffect } from 'react';
import { notification } from 'antd';
import { audio, checkWillMessageBeShown, notificationGlobConfig } from '../models/income-message/income-message';
import { showUnredMessage } from '../models/income-message/income-message';
import { WorkPageContext } from '../models/context';

const UnreadMessageNotificationContextHolder = ({dialoguesData, notificationsWillBeNotShown}) => {
  const { clientsCollSnapshot } = useContext(WorkPageContext)
  const [api, contextHolder] = notification.useNotification(notificationGlobConfig);
  console.log("UnreadMessageNotificationContextHolder")

  useEffect(() => {
    
    // if(dialoguesData) {
      // показывает непрочитанное сообщение, кроме тех, которые уже были показаны, либо были получены оффлайн. Они записаны в notificationsWillBeNotShown
      dialoguesData.forEach(dialogue => {
        dialogue.messages.forEach(message => {
          if(!message.sendState ) {
            if(checkWillMessageBeShown(dialogue.UID, message, notificationsWillBeNotShown)) {
              const clientDocSNap = clientsCollSnapshot.docs.find(clientDocSnap => clientDocSnap.get('UID') === dialogue.UID)
              const client = clientDocSNap.data()
              const applicantName = client?.name 
              ? client.name 
              : (
                client?.passports[0]?.first_name 
                    ? `${client.passports[0].first_name} ${client.passports[0].last_name}`
                    : client?.UID
                )
              showUnredMessage(api, applicantName, message);
              audio.play()
            } else {
              return;
            }
          }
        })
      })
    // }
   
  }, [dialoguesData, api, notificationsWillBeNotShown, ])

  return (
    <>
      {contextHolder}
    </>
    
  )
};

export default UnreadMessageNotificationContextHolder;
