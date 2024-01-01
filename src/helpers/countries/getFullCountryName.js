import { getCountry } from "./getCountry";

export const getFullCountryName = (countries, countryCode) => {
  const findedCountry = getCountry(countries, countryCode);
  return findedCountry.name_ru
}
