import {collection, query} from "firebase/firestore";
import {firestore} from "../firebase.js";

export const applicantsPath = {
  applicants: "users",
}

const getUsersRef = () => {
  return collection(firestore, applicantsPath.applicants);
}

export const getUsersQuery = () => {
  return query(getUsersRef());
}
