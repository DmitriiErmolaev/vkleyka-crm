import {collection, query} from "firebase/firestore";
import {PATHS} from "../paths.js";
import {firestore} from "../firebase.js";

const getUsersRef = () => {
  return collection(firestore, PATHS.applicants);
}

export const getUsersQuery = () => {
  return query(getUsersRef());
}
