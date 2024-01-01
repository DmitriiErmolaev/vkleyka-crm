import { doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { adminsPath } from "./adminsPath";

export const getAdminsRef = () => {
  return doc(firestore, adminsPath.admins);
};
