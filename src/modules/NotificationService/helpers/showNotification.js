import showOperationStatusNotification from "./showOperationStatusNotification";
import showUnreadMessageNotification from "./showUnreadMessageNotification";
import showUnreviewedAppNotification from "./showUnreviewedAppNotification";

const notificationOpenFunctions = {
  process: showOperationStatusNotification,
  unreadMessage: showUnreadMessageNotification,
  unreviewedApps: showUnreviewedAppNotification,
}

const showNotification = (notificationAPI, notificationType, options) => {
  notificationOpenFunctions[notificationType](notificationAPI, options);
}

export default showNotification;
