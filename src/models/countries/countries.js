import {doc} from "firebase/firestore";
import {PATHS} from "../paths.js";
import {firestore} from "../firebase.js";

export const getAllCountriesRef = () => {
  return doc(firestore, PATHS.countries);
}
// получение пути хранения флага в firebase storage. Пока не используется.
export const getCountryFlag = (countries, countryCode) => {
  const findedCountry = countries.find(country => {
    return countryCode === country.country_code;
  })
  return findedCountry.flag
}