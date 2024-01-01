import React from 'react';
import SelectComponent from '../selectors/SelectComponent';

const CountryFilter = ({countries, setSelectedCountry, selectedCountry}) => {
  return (
    <SelectComponent
      collectionType={"countries"}
      data={{countries, setSelectedCountry, selectedCountry}}
    />
  );
};

export default CountryFilter;
