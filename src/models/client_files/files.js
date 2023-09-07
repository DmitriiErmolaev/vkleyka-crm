import { updateDocField } from "../data-processing";
import { getFileRef } from "../firebase";
import { deleteObject, getDownloadURL } from "firebase/storage";

export const storageDocumentsPath = {
  visaDocuments: "documents"
}

export const docKeys = {
  // имена свойств соответствуют data атрибуту кнопок загрузки.
  // значения - ключи, по которым в массиве искать объекты по пути: preparedInformation.documents: <array>
  appointment: "appointment",
  application: "application",
}

export const getUpdatedExtraFileList = (fileListState, file) => {
  return [...fileListState, {name: file.name, status: 'uploading', uid: file.uid}]
}

export const getArrayWithUpdatedPropById = (array, objectToUpdateId, propToUpdate, value) => {
  return array.map((file) => {
    if (file.uid === objectToUpdateId) {
      return {...file, [propToUpdate]: value}
    }
    return file;
  })
}

export const updateUploadPath = (newUploadedFilesInfo, uid, path) => {
  return newUploadedFilesInfo.map(fileInfo => {
    if(fileInfo.uid === uid) {
      return {...fileInfo, link: path};
    }
    return fileInfo;
  })
}

const removeFromUploadedFilesInfo = (curUploadedDocs, uid) => {
  return curUploadedDocs.filter(doc => {
    return doc.uid !== uid;
  })
}

export const updateUploadedFilesInfo = async(ref, path, data) => {
  await updateDocField(ref, path, data)
}

export const deleteUploadedFile = async (uploadedDocs, uid, applicationRef) => {
  try {
    const deletingFileInfo = uploadedDocs.find(docInfo => {
      return docInfo.uid === uid
    })
    const storageFileRef = getFileRef(deletingFileInfo.link);
    await deleteObject(storageFileRef);
    const removedFromUploadedFilesInfo = removeFromUploadedFilesInfo(uploadedDocs, uid);
    await updateUploadedFilesInfo(applicationRef, "preparedInformation.documents", removedFromUploadedFilesInfo);
  } catch (e) {
    throw e
  }
}

export const getuploadedFileDownloadURL = async (path) => {
  const downloadURL = await getDownloadURL(getFileRef(path))
  return downloadURL
}