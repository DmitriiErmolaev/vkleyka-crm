import { doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { applicationsPath } from "./appsPath";

export const getAppRefById = (docId) => {
  return doc(firestore, `${applicationsPath.applications}/${docId}`)
};
