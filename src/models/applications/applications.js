import {collection, doc, where, orderBy, query} from "firebase/firestore";
import { firestore } from "../../firebase/firebase.js";
import { getBlob } from 'firebase/storage';
import { getAppsCollRef } from "../../firebase/applications/getAppsCollRef.js";



export const paymentTypes = {
  online: 'Оплачено',
  office: 'В офисе'
}







// export const getFileUrl = async (fileRef) => {
// // TODO: надо как то сохранять этот файл, и потом уже брать из скаченных.
//   try {
//     const fileBlob = await getBlob(fileRef);
//     return URL.createObjectURL(fileBlob)
//   } catch (error) {
//     console.log(error)
//   }
// }
