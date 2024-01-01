import { collection, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { chatPaths } from "../../../firebase/chat/chatsPath";

export const getDeletingOperatorChatQuery = (id) => {
  return query(collection(firestore, chatPaths.chatCollection), where('assignedTo', '==', id));
};
