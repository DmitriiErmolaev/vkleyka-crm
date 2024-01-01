export const updateUploadPath = (newUploadedFilesInfo, uid, path) => {
  return newUploadedFilesInfo.map(fileInfo => {
    if(fileInfo.uid === uid) {
      return {...fileInfo, link: path};
    }
    return fileInfo;
  })
};
