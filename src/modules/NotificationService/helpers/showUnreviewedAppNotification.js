import getNotificationConfig from "./getNotificationConfig";
import getUnreviewedAppNotificationDescription from "./getUnreviewedAppNotificationDescription";
import playNotificationSound from "./playNotificationSound";

const showUnreviewedAppNotification = (notidicationAPI, options) => {
  const config = getNotificationConfig('unreviewedApps')
  const description = getUnreviewedAppNotificationDescription(options)
  playNotificationSound('unreviewedApps')
  notidicationAPI.info({...config, description})
}

export default showUnreviewedAppNotification;