import {collection, doc} from "firebase/firestore";
import {PATHS} from "../paths.js";
import {firestore} from "../firebase.js";

export const getAppsRef = () => {
  return collection(firestore,PATHS.applications);
}

export const getAppRefById = (docId) => {
  return doc(firestore, `applications/${docId}`)
}