import { limit, query, where} from "firebase/firestore";
import { getChatsCollectionRef } from "../../firebase/chat/getChatsCollectionRef.js";

export const getDialogueSnap = (chatCollection, applicantId) => {
  return chatCollection.docs.find(docSnap => {
    return docSnap.get('UID') === applicantId;
  })
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






