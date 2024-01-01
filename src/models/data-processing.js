import {limit, query, startAfter} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export const getSingleFieldFromDocSnapshot = (docSnapshot, fieldName) => {
  return docSnapshot.get(fieldName);
}



export const getDataFromCollSnapshot = (collSnap) => {
  if (!collSnap) {
    return
  }
  return collSnap.docs.map(docSnap => {
    return docSnap.data();
  })
}





export const getDocsRefs = (collSnap) => {
  let refs = [];
  collSnap.forEach(docSnap => {
    refs.push(docSnap.ref);
  })
}



