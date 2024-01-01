import { query, where } from "firebase/firestore"
import { getChatsCollectionRef } from "../../../firebase/chat/getChatsCollectionRef"

// ищет документ в коллекции, в котором поле UID содержит искомый айди юзера.
export const getChatQueryForApplication = (applicantId) => {
  return query(getChatsCollectionRef(), where("UID", "==", applicantId))
};
