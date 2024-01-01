export const getCountry = (countries, curCountryCode) => {
  return countries.find(country => country.country_code === curCountryCode);
}
