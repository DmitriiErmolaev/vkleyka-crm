import {query} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

export const getSingleFieldFromDocSnapshot = (docSnapshot, fieldName) => {
  return docSnapshot.get(fieldName);
}

export const getAllFieldsFromDocSnapshot = (docSnapshot) => {
  return docSnapshot.data();
}

export const getDataFromCollSnapshot = (collSnap) => {
  if (!collSnap) {
    return
  }
  return collSnap.docs.map(docSnap => {
    return docSnap.data();
  })
}

export const getQueryWithConstraints = (ref,constraints) => {
  return query(ref, ...constraints)
}

export const getDocsRefs = (collSnap) => {
  let refs = [];
  collSnap.forEach(docSnap => {
    refs.push(docSnap.ref);
  })
}

export const updateDocField = async (ref, path, data) => {
  try {
    await updateDoc(ref, {[path]: data})
  } catch (e) {
    // TODO: отобразить 
    console.log(e)
  }
}
 
export const getPercent = (cur, total) => {
  return Math.trunc(cur/total * 100);
}
