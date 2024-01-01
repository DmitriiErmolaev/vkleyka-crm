export const getUpdatedExtraFileList = (fileListState, file) => {
  return [...fileListState, {name: file.name, status: 'uploading', uid: file.uid}]
};
