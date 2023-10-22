import {collection, orderBy, query, where} from "firebase/firestore";
import {firestore} from "../firebase.js";
import { updateDocField } from "../data-processing.js";
import { createNewMessageObject } from "./message.js";
import { findOperatorName } from "../operator/operators-data-processing.js";

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

export const getChatsQueryForDialoguesList = (authorizedUser, searchFilters) => {
  // const searchQuery = query(getChatsCollectionRef())
  if(authorizedUser.role === "operator") {
    if(searchFilters) {
      // return query(getChatsCollectionRef(), where('preparedInformation.assignedTo', '==', authorizedUser.id), where('UID',  ));
    }
    return  query(getChatsCollectionRef(), where('active', '!=', false), where('assignedTo', 'in', [authorizedUser.id, '']));
  }
  if(authorizedUser.role === 'admin') {
    if(searchFilters) {
      return query(getChatsCollectionRef(), where('UID', '>=', searchFilters ))
    }
    return  query(getChatsCollectionRef());
  }
}
// ищет документ в коллекции, в котором поле UID содержит искомый айди юзера.
export const getChatQueryForApplication = (applicantId) => {
    return query(getChatsCollectionRef(), where("UID", "==", applicantId))
}

export const getAssignedOperator = (admins, operatorId) => {
  return operatorId ? findOperatorName(admins, operatorId) : 'Не назначен';
}

/**
 * Returns messages array with all read messages inside. Otherwise - returns false
 * @param {*} messages 
 * @param {*} authorizedUser 
 * @returns 
 */
const makeAllMessagesReadIfTheyAreNot = (messages, authorizedUser) => {
  let notMyUnreadMessagesExist = false;
  const unreadMessages = [];
  const allReadMessages = messages.map(message => {
    if(message.sendState === 0 && message.sender !== authorizedUser.name) {
      notMyUnreadMessagesExist = true;
      unreadMessages.push(message);
      return {...message, sendState: 1};
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
  const newMessage = createNewMessageObject(text, authorizedUser.name, attachmentsArray);
  const allReadMessagesOrFalse = makeAllMessagesReadIfTheyAreNot(messages, authorizedUser)
  const newMessagesToUpload = [...(allReadMessagesOrFalse || messages), newMessage];
  await updateDocField(chatDocRef, chatPaths.userChatDocumentField, newMessagesToUpload);
}

/**
 * If there were unread messages - upload them to the firestore, otherwise do nothing.
 * @param {*} chatDocRef 
 * @param {*} messages 
 * @param {*} authorizedUser 
 */
export const readUnreadMessages = async (chatDocRef, messages, authorizedUser, setUnreadMessagesToNotify) => {
  const allReadMessagesOrFalse = makeAllMessagesReadIfTheyAreNot(messages, authorizedUser, setUnreadMessagesToNotify)
  console.log(allReadMessagesOrFalse)
  if (allReadMessagesOrFalse) await updateDocField(chatDocRef, 'messages', allReadMessagesOrFalse)
}

