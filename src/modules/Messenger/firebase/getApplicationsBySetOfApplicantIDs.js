import { orderBy, query, where } from "firebase/firestore";
import { getAppsCollRef } from "../../../firebase/applications/getAppsCollRef";

// запрос на получение всех заявок клиентов. 
export const getApplicationsBySetOfApplicantIDs = (chatsCollSnapshot, authorizedUserId, role) => {
  const downloadedChatsApplicantIDs = chatsCollSnapshot.docs.map(docSnap => {
    return docSnap.get('UID');
  })
  console.log(downloadedChatsApplicantIDs)
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
};
