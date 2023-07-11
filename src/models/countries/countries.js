import {doc} from "firebase/firestore";
import {firestore} from "../firebase.js";


export const countriesPath = {
  countries: "countries-mini/all-countries",
}

const countryMatrix = {
  optionLabel: "name_ru",
  optionValue: "country_code",
}

export const getCountriesOptions = (countries) => {
  return countries.map((country) => {
    return {
      value: country[countryMatrix.optionValue], 
      label: country[countryMatrix.optionLabel],
    }
  })
}

export const getAllCountriesRef = () => {
  return doc(firestore, countriesPath.countries);
}

// получение пути хранения флага в firebase storage. 
export const getCountryFlag = (countries, countryCode) => {
  const findedCountry = countries.find(country => {
    return countryCode === country.country_code;
  })
  return findedCountry.flag
}