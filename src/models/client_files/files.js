export const storageDocumentsPath = {
  visaDocuments: "documents"
}

export const docKeys = {
  // имена свойств соответствуют data атрибуту кнопок загрузки.
  // значения - ключи, по которым в массиве искать объекты по пути: preparedInformation.documents: <array>
  appointment: "appointment",
  application: "application",
}

export function getNewFileExtraProps (fileName, uploadingStatus, id, uploadingPercent) {
  const props = {
    name: fileName,
    status: uploadingStatus,
    uid: id,
  }

  return uploadingPercent ?  {...props, percent: uploadingPercent,} : props;
}

export const getNewUploadedDocs = (curUploadedDocs, options) => {
  const {docType, uploadPath, fileName} = options;

  if(uploadPath === null) { // при удалении
    return curUploadedDocs.filter(doc => {
      return doc.key !== docKeys[docType];
    })
  }
  const newDocToUpload = {key: docType, link:uploadPath, name: fileName}

  if(curUploadedDocs.length === 0) { // при первой загрузке документа
    return [newDocToUpload];
  }

  const alreadyUploadedDocIndex = curUploadedDocs.findIndex((doc => {
    return doc.key === docType;
  }))

  if(alreadyUploadedDocIndex !== -1) {
    const newUploadedDocs = [...curUploadedDocs];
    newUploadedDocs[alreadyUploadedDocIndex] = newDocToUpload;
    return newUploadedDocs
  } else {
    return [...curUploadedDocs, newDocToUpload]
  }
}
