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
export const getChatQuery = () => {
  return query(getChatsCollectionRef())
}
export const getChatsQueryForDialoguesList = (operatorId) => {
  // INFO: запрос на диалоги, где assignedTo равен переданному айди или пустой строке.
  return  query(getChatsCollectionRef(), where('assignedTo', 'in', [operatorId, '']));
}
// ищет документ в коллекции, в котором поле UID содержит искомый айди юзера.
export const getChatQueryForApplication = (applicantId) => {
    return query(getChatsCollectionRef(), where("UID", "==", applicantId))
}

export const getDialogueRef = (chatCollection, applicantId) => {
  const docSnap = chatCollection.docs.find(docSnap => {
    return docSnap.get('UID') === applicantId;
  })
  console.log(docSnap.ref)
  return docSnap.ref;
}

export  const sendMessage = async (text, operatorName, docRef, messageData, attachmentsArray) => {
  const newMessage = createNewMessageObject(text, operatorName, attachmentsArray);
  const newMessagesToUpload = [...messageData, newMessage];
  await updateDocField(docRef, chatPaths.userChatDocumentField, newMessagesToUpload);
}

