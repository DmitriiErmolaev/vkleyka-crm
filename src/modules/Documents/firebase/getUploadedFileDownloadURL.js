import { getDownloadURL } from "firebase/storage";
import { getFileRef } from "../../../firebase/firebase";

export const getUploadedFileDownloadURL = async (path) => {
  const downloadURL = await getDownloadURL(getFileRef(path))
  return downloadURL
};
