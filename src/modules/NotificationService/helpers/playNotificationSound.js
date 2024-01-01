const unreadMessageAudio = new Audio();
unreadMessageAudio.src = './sounds/new-message-signal.mp3'
const unreviewedAppAudio = new Audio();
unreviewedAppAudio.src = './sounds/new-app-signal.mp3'

const audios = {
  unreadMessage: unreadMessageAudio,
  unreviewedApps: unreviewedAppAudio,
}

const playNotificationSound = (notificationType) => {
  console.log(audios[notificationType].src)
  audios[notificationType].play().catch(e => {
    if(e.name === 'NotAllowedError') {
      // Nobody interacted with the page.
    }
    console.log(e)
  })
}

export default playNotificationSound;
