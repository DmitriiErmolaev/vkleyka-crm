
export const notificationGlobConfig = {
  bottom: -15,
  placement: 'bottomRight',
}


export const showUnredMessage = (api, applicantName, message) => {
  api.info({
    icon: '',
    key: message.UID,
    message: applicantName,
    description: message.content, 
    className: 'notification',
  })
}

export const audio = new Audio()
audio.src = './sounds/notification-signal.mp3'

export const checkWillMessageBeShown = (clientUID, message, notificationsWillNotShow) => {
  if(!notificationsWillNotShow.length) return true;
  const isMessageIncluded = notificationsWillNotShow.some(item => {
    return item.key === `${clientUID}-${message.time.nanoseconds}`;
    // return item.id === message.id;
  })
  return !isMessageIncluded;
}