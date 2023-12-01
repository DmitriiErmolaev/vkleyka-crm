
export const notificationGlobConfig = {
  bottom: -15,
  placement: 'bottomRight',
}


export const showUnredMessage = (api, name, message) => {
  api.info({
    icon: '',
    key: message.id,
    message: name, // TODO: исправить, когда появится поле в БД.
    description: message.content, 
    className: 'notification',
  })
}

export const audio = new Audio()
audio.src = './sounds/notification-signal.mp3'

export const checkWillMessageBeShown = (clientUID, message, notificationsWillNotShow, selectedDialogue) => {
  if(!notificationsWillNotShow.length) return true;
  const isMessageIncluded = notificationsWillNotShow.some(item => {
    return item.id === message.id;
    //TODO: return item.id === message.id;
  })
  return !isMessageIncluded;
}