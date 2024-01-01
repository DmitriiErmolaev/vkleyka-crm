import { query } from "firebase/firestore"
import { getChatsCollectionRef } from "./getChatsCollectionRef"

export const getChatQuery = () => {
  return query(getChatsCollectionRef())
};
