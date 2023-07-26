import {collection, doc} from "firebase/firestore";
import {firestore} from "../firebase.js";
import { getBlob } from 'firebase/storage';

export const applicationsPath = {
  applications: "applications",
}

export const getAppsCollRef = () => {
  return collection(firestore,applicationsPath.applications);
}

export const getAppRefById = (docId) => {
  return doc(firestore, `applications/${docId}`)
}

export const getFileUrl = async (flagRef) => {
// TODO: надо как то сохранять этот файл, и потом уже брать из скаченных.
  try {
    const flagBlob = await getBlob(flagRef);
    return URL.createObjectURL(flagBlob)
  } catch (error) {
    console.log(error)
  }
}
