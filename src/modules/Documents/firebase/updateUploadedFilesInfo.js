import updateDocField  from "../../../firebase/updateDocField";

export const updateUploadedFilesInfo = async(ref, path, data) => {
  await updateDocField(ref, path, data)
};
