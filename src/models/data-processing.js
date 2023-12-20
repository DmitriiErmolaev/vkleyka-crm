import {limit, query, startAfter} from "firebase/firestore";
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

export const getQueryForAppsWithLimit = (ref, filters, pageCount) => {
  // Фильтры нельзя мутировать, т.к. в функции getQueryForAppsWithoutLimit фильтры не должны быть измененными
  // const constraints = lastDoc ? [...filters, startAfter(lastDoc)] : filters;
  return query(ref, ...filters, limit(5 * pageCount))
}

export const getQueryForAppsWithoutLimit = (ref, filters) => {
  return query(ref, ...filters)
}

export const getDocsRefs = (collSnap) => {
  let refs = [];
  collSnap.forEach(docSnap => {
    refs.push(docSnap.ref);
  })
}

export const updateDocField = async (ref, path, data) => {
  try {
    const res = await updateDoc(ref, {[path]: data})
  } catch (e) {
    // TODO: отобразить 
    console.log(e)
  }
}
 
export const getPercent = (cur, total) => {
  return Math.trunc(cur/total * 100);
}
