import { collection, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";

export const getDeletingOperatorAppsQuery = (id) => {
  return query(collection(firestore, 'applications'), where('preparedInformation.assignedTo', '==', id), where('paymentSuccessful', '==', true));
};
