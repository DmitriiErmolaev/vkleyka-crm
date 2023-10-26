import { where, query, orderBy } from "firebase/firestore";
import { getAppsCollRef } from "../../applications/applications";
import { sklonenie } from "../../../utils";

export const getDialogueListFilters = (searchStr) => {
  let filters = [];
  if(searchStr){
    filters.push(where());
  }
}
  
// запрос на получение всех заявок клиентов. 
export const getApplicationsBySetOfApplicantIDs = (chatsCollSnapshot, authorizedUserId, role) => {
  const downloadedChatsApplicantIDs = chatsCollSnapshot.docs.map(docSnap => {
    return docSnap.get('UID');
  })

  if (downloadedChatsApplicantIDs.length === 0) {
    // where ('UID', "in", clientsIDs) не должен принимать пустой массив. иначе будет ошибка.
    return null;
  }

  const constraints = [
    where('paymentSuccessful', '==', true),
    where('UID', "in", downloadedChatsApplicantIDs), 
    orderBy("createdAt", "asc")
  ]

  if (role === 'operator') constraints.push(where('preparedInformation.assignedTo', '==', authorizedUserId));

  return query(getAppsCollRef(), ...constraints)
}
