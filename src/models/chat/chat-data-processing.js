import {collection, query, where} from "firebase/firestore";
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

export const getDialogueRef = (chatCollection, applicantId) => {
  const docSnap = chatCollection.docs.find(docSnap => {
    return docSnap.get('UID') === applicantId;
  })
  return docSnap.ref;
}

export const getChatQuery = () => {
  return query(getChatsCollectionRef())
}

export const getChatsQueryForDialoguesList = (authorizedUser) => {
  // INFO: запрос на диалоги, где assignedTo равен переданному айди или пустой строке.
  if(authorizedUser.role === "operator") {
    return  query(getChatsCollectionRef(), where('assignedTo', 'in', [authorizedUser.id, '']));
  }
  if(authorizedUser.role === "admin") {
    return  query(getChatsCollectionRef());
  }

}
// ищет документ в коллекции, в котором поле UID содержит искомый айди юзера.
export const getChatQueryForApplication = (applicantId) => {
    return query(getChatsCollectionRef(), where("UID", "==", applicantId))
}

export  const sendMessage = async (text, operatorName, docRef, messageData, attachmentsArray) => {
  const newMessage = createNewMessageObject(text, operatorName, attachmentsArray);
  const newMessagesToUpload = [...messageData, newMessage];
  await updateDocField(docRef, chatPaths.userChatDocumentField, newMessagesToUpload);
}

export const getAssignedOperator = (admins, operatorId) => {
  return operatorId ? findOperatorName(admins, operatorId) : 'Не назначен';
}

export const readUnreadMessages = async (chatDocRef, data) => {
 await updateDocField(chatDocRef, 'messages', data)
}