import updateDocField  from "../../../firebase/updateDocField";
import { chatPaths } from "../../../firebase/chat/chatsPath";
import { createNewMessageObject } from "../helpers/createNewMessageObject";
import { makeAllMessagesReadIfTheyAreNot } from "../helpers/makeAllMessagesReadIfTheyAreNot";
import { Transaction, runTransaction } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import showNotification from "../../NotificationService/helpers/showNotification";

/**
 * Prepares new messages instance and upoads it to the firebase.
 * @param {*} text
 * @param {*} authorizedUser
 * @param {*} chatDocRef
 * @param {*} messages
 * @param {*} attachmentsArray
 */
export const sendMessage = async (notificationAPI, text, authorizedUser, chatDocRef, messages, attachmentsArray) => {
  try {
    const newMessage = createNewMessageObject(text, authorizedUser, attachmentsArray);
    const allReadMessagesOrFalse = !authorizedUser.role === 'admin' && makeAllMessagesReadIfTheyAreNot(messages);
    const newMessagesToUpload = [...(allReadMessagesOrFalse || messages), newMessage];
    await runTransaction(firestore, async (transaction) => {
      console.log(newMessage)
      transaction.update(chatDocRef, 'lastEdited', newMessage.time)
      transaction.update(chatDocRef, chatPaths.userChatDocumentField, newMessagesToUpload)
    })
  } catch (error) {
    console.log(error)
    showNotification(notificationAPI, {processName: 'sendMessage', status: 'error'})
  }
};