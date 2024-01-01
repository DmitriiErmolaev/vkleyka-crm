import updateDocField  from "../../../firebase/updateDocField";
import { makeAllMessagesReadIfTheyAreNot } from "../helpers/makeAllMessagesReadIfTheyAreNot";

/**
 * If there were unread messages - upload them to the firestore, otherwise do nothing.
 * @param {*} chatDocRef
 * @param {*} messages
 * @param {*} authorizedUser
 */
export const readUnreadMessages = async (chatDocRef, messages) => {
  const allReadMessagesOrFalse = makeAllMessagesReadIfTheyAreNot(messages)
  if (allReadMessagesOrFalse) await updateDocField(chatDocRef, 'messages', allReadMessagesOrFalse)
}
