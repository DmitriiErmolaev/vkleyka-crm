import { collection } from "firebase/firestore";
import { firestore } from "../firebase";
import { applicationsPath } from "./appsPath";

export const getAppsCollRef = () => {
  return collection(firestore, applicationsPath.applications);
}
