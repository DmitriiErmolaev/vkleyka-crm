
// матрица для поиска имен свойств в объекте данных.
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

// получение пути хранения флага в firebase storage.
export const getCountryFlag = (countries, countryCode) => {
  const findedCountry = countries.find(country => {
    return countryCode === country.country_code;
  })
  return findedCountry.flag
}

