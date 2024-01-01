import { orderBy, query, where } from "firebase/firestore";
import { getAppsCollRef } from "../../../firebase/applications/getAppsCollRef";

const getAllClientApplications = (clientId, authorizedUserId, role ) => {
  const constraints = [
    where('paymentSuccessful', '==', true),
    where('UID', '==', clientId),
    orderBy("createdAt", "asc"),
  ]

  if (role === 'operator') constraints.push(where('preparedInformation.assignedTo', '==', authorizedUserId));

  return query(getAppsCollRef(), ...constraints);
};

export default getAllClientApplications;
