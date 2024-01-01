import { collection } from "firebase/firestore";
import { firestore } from "../firebase";
import { chatPaths } from "./chatsPath";

export const  getChatsCollectionRef = () => {
  return collection(firestore, chatPaths.chatCollection);
}