import { updateDoc } from "firebase/firestore"

const updateDocField = async (ref, path, data) => {
  try {
    await updateDoc(ref, {[path]: data})
  } catch (e) {
    // TODO: отобразить 
    console.log(e)
  }
}
export default updateDocField;
