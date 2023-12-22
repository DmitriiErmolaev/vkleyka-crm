import {collection, query, where} from "firebase/firestore";
import {firestore} from "../firebase.js";
import { updateDocField } from "../data-processing.js";
import { createNewMessageObject } from "./message.js";

export const chatPaths = {
  chatCollection: 'vkleyka_chat',
  storageAttachmentsFolder: 'chatDocs',
  userChatDocumentField: "messages",
}

const  getChatsCollectionRef = () => {
  return collection(firestore, chatPaths.chatCollection);
}

export const getDialogueSnap = (chatCollection, applicantId) => {
  return chatCollection.docs.find(docSnap => {
    return docSnap.get('UID') === applicantId;
  })
}

export const getChatQuery = () => {
  return query(getChatsCollectionRef())
}

export const getChatsQueryForDialoguesList = (authorizedUser, searchFilter) => {

  const constraints = {
    operator: [
      where('active', '==', true),
      where('assignedTo', 'in', [authorizedUser.id, '']),
    ],
    admin: [],
  }

  if (searchFilter) {
    constraints[authorizedUser.role].push(where('UID', '>=', searchFilter));
    constraints[authorizedUser.role].push(where('UID', '<=', searchFilter + '\uf8ff'));
    // constraints[authorizedUser.role].push(where('phoneNumber', '>=', searchFilter))
    // constraints[authorizedUser.role].push(where('phoneNumber', '<=', searchFilter + '\uf8ff'))
  }

  return  query(getChatsCollectionRef(), ...constraints[authorizedUser.role]);
}

// ищет документ в коллекции, в котором поле UID содержит искомый айди юзера.
export const getChatQueryForApplication = (applicantId) => {
    return query(getChatsCollectionRef(), where("UID", "==", applicantId))
}

/**
 * Returns messages array with all read messages inside. Otherwise - returns false
 * @param {*} messages
 * @param {*} authorizedUser
 * @returns
 */
const makeAllMessagesReadIfTheyAreNot = (messages) => {
  let notMyUnreadMessagesExist = false;
  const allReadMessages = messages.map(message => {
    if(message.readBy && !message.readBy.includes('operator')) {
      notMyUnreadMessagesExist = true;
      return {...message, readBy: [...message.readBy, 'operator']};
    }
    return message;
  })

  return notMyUnreadMessagesExist && allReadMessages;
}

/**
 * Prepares new messages instance and upoads it to the firebase.
 * @param {*} text
 * @param {*} authorizedUser
 * @param {*} chatDocRef
 * @param {*} messages
 * @param {*} attachmentsArray
 */
export const sendMessage = async (text, authorizedUser, chatDocRef, messages, attachmentsArray) => {
  const newMessage = createNewMessageObject(text, authorizedUser, attachmentsArray);
  const allReadMessagesOrFalse = !authorizedUser.role === 'admin' && makeAllMessagesReadIfTheyAreNot(messages);
  const newMessagesToUpload = [...(allReadMessagesOrFalse || messages), newMessage];
  await updateDocField(chatDocRef, chatPaths.userChatDocumentField, newMessagesToUpload);
}

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

