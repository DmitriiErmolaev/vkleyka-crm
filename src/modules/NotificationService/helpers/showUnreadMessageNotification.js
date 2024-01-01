import getNotificationConfig from "./getNotificationConfig";
import playNotificationSound from "./playNotificationSound";

const showUnreadMessageNotification = (notidicationAPI, options) => {
  const { title: message, description } = options;
  const config = getNotificationConfig('unreadMessage');
  playNotificationSound('unreadMessage')
  notidicationAPI.info({...config, message, description});
  // notidicationAPI.info({message, description});
}

export default showUnreadMessageNotification;