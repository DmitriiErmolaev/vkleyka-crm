import {collection, doc} from "firebase/firestore";
import {firestore} from "../firebase.js";
import { updateDoc } from "firebase/firestore";
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

export const setDataToDownloadFile = (uploadResult, uploadedDocs, docName  ) => {
  if (uploadedDocs.length > 0) {
  //сюда случай перезаписи информации о документе 
  }
  let obj = {
    link: uploadResult.metadata.fullPath,
    name: docName
  } 
}

export const getFlagUrl = async (flagRef) => {
// надо как то сохранять этот файл, и потом уже брать из скаченных.
  console.log(flagRef);
  const flagBlob = await getBlob(flagRef);
  console.log(flagBlob);

  return URL.createObjectURL(flagBlob);
}