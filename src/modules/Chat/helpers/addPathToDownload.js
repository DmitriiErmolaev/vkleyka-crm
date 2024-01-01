export const addPathToDownload = (index, path, attachments) => {
  attachments[index].link = path
  return attachments;
};
