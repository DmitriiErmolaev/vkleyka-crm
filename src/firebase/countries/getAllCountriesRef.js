import { doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { countriesPath } from "./countriesPath";

const getAllCountriesRef = (country) => {
  if (country) return null;
  return doc(firestore, countriesPath.countries);
};

export default getAllCountriesRef;
