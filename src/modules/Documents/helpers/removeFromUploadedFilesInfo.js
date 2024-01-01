export const removeFromUploadedFilesInfo = (curUploadedDocs, uid) => {
  return curUploadedDocs.filter(doc => {
    return doc.uid !== uid;
  })
};
