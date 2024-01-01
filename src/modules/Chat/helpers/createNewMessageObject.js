import { Timestamp } from "firebase/firestore";
import { nanoid } from "nanoid";

export const createNewMessageObject = (text, authorizedUser, attachmentsArray = [], isSttachmentsLoading) => {
  const time = isSttachmentsLoading ? Date.now() : Timestamp.now(); // для отображения загружающегося сообщения в чате на фронте или сообщения. принятого из firebase.
  return {
    id: nanoid(),
    attachments: attachmentsArray,
    content: text,
    sendState: 0,
    readBy: [authorizedUser.role,],
    sender: authorizedUser.name,
    avatar: authorizedUser.avatar,
    time: time,
    type: "message",
  }
}
