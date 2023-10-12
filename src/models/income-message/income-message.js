const title = 'Согласие на уведомления';

export const getNotificationAPI = async (body) => {
 
  if(!Notification.permission === 'granted') {
    await Notification.requestPermission()
  }
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {body})
  }
}