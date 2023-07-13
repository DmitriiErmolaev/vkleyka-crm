import {collection, query, where} from "firebase/firestore";
import {firestore} from "../firebase.js";

export const chatPath = {
  chat: "vkleyka_chat",
}

const  getChatRef = () => {
  return collection(firestore, chatPath.chat);
}

export const getChatQuery = (applicantId) => {
  return query(getChatRef(), where("UID", "==", applicantId))
}