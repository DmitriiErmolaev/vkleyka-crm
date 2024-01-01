import { deleteObject } from "firebase/storage";
import { getFileRef } from "../../../firebase/firebase";
import { updateUploadedFilesInfo } from "./updateUploadedFilesInfo";
import { removeFromUploadedFilesInfo } from "../helpers/removeFromUploadedFilesInfo";

export const deleteUploadedFile = async (uploadedDocs, uid, applicationRef) => {
  try {
    const deletingFileInfo = uploadedDocs.find(docInfo => {
      return docInfo.uid === uid
    })
    const storageFileRef = getFileRef(deletingFileInfo.link);
    await deleteObject(storageFileRef); // удаление файла из storage
    const removedFromUploadedFilesInfo = removeFromUploadedFilesInfo(uploadedDocs, uid);
    await updateUploadedFilesInfo(applicationRef, "preparedInformation.documents", removedFromUploadedFilesInfo); // удаление записи об этом файле из firestore
  } catch (e) {
    throw e
  }
};
