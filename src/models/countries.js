import {doc} from "firebase/firestore";
import {PATHS} from "./paths.js";
import {firestore} from "./firebase";

export const getAllCountriesRef = () => {
  return doc(firestore, PATHS.countries);
}