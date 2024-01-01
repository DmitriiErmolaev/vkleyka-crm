import { nanoid } from "nanoid";

const notificationConfig = {
  processes: {
    closeIcon: true,
    duration: 4.5,
    placement: 'topRight',
  },
  unreadMessage: {
    closeIcon: true,
    duration: 4.5,
    placement: 'bottomRight',
  },
  unreviewedApps: {
    closeIcon: true,
    duration: 4.5,
    placement: 'topRight',
    message: 'Новая заявка',
  }
}

const getNotificationConfig = (notificationType) => {
  return notificationConfig[notificationType]
}

export default getNotificationConfig;