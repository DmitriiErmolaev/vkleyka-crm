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
    return  query(getChatsCollectionRef(), where('active', '!=', false));
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

export const sendMessage = async (text, authorizedUser, chatDocRef, dialogue, attachmentsArray) => {
  const newMessage = createNewMessageObject(text, authorizedUser.name, attachmentsArray);
  const readMessages = dialogue.messages.map(message => {
    if(message.sendState === 0 && message.sender !== authorizedUser.name) {
      return {...message, sendState: 1};
    }
    return message;
  })
  const newMessagesToUpload = [...readMessages, newMessage];
  await updateDocField(chatDocRef, chatPaths.userChatDocumentField, newMessagesToUpload);
}

export const getAssignedOperator = (admins, operatorId) => {
  return operatorId ? findOperatorName(admins, operatorId) : 'Не назначен';
}

export const readUnreadMessages = async (chatDocRef, dialogue, authorizedUser) => {
  let notMyUnreadMessagesExist = false;
  const readMessages = dialogue.messages.map(message => {
    if(message.sendState === 0 && message.sender !== authorizedUser.name) {
      notMyUnreadMessagesExist = true;
      return {...message, sendState: 1};
    }
    return message;
  })
  if (notMyUnreadMessagesExist) {
    await updateDocField(chatDocRef, 'messages', readMessages)
  }
}
