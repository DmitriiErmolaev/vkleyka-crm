
export const storageDocumentsPath = {
  visaDocuments: "documents"
}

export const docKeys = {
  // имена свойств соответствуют data атрибуту кнопок загрузки.
  // значения - ключи, по которым в массиве искать объекты по пути: preparedInformation.documents: <array>
  appointment: "appointment",
  application: "application",
}

export function getNewFileExtraProps (fileName, uploadingStatus, uploadingPercent) {
  const props = {
    name: fileName,
    status: uploadingStatus  
  }

  return uploadingPercent ?  {...props, percent: uploadingPercent,} : props;
}


export const getUploadedDocsInfo = (curUploadedDocsInfo, options) => {

  const {docType, uploadPath, fileName} = options;
  if(curUploadedDocsInfo.length === 0) {
    return [{key: docType, link:uploadPath, name: fileName}]
  }
  let isDocUploadedAlready = false;

  const newUploadedDocsInfo = curUploadedDocsInfo.map((document) => {
    if(document.key === docKeys[docType]){
      // прежний путь будет перезаписан. 
      isDocUploadedAlready = true
      return {...document, link: uploadPath, name: fileName }
    }
    return document;
  })
  console.log(newUploadedDocsInfo)
  if( !isDocUploadedAlready) {
    newUploadedDocsInfo.push({key: docType, link:uploadPath, name: fileName})
    return newUploadedDocsInfo;
  } else {
    return newUploadedDocsInfo;
  }
}

// export const getFileExtraProps =  (uploadedDocName) => {
//   if()
//   return {
//       name: uploadedDocName, 
//       status:"done"
//   }
// }