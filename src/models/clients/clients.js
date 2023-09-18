import {collection, query} from "firebase/firestore";
import {firestore} from "../firebase.js";

export const clientsPath = {
  clients: "users",
}

const getClientsRef = () => {
  return collection(firestore, clientsPath.clients);
}

export const getClientsQuery = () => {
  return query(getClientsRef());
}
