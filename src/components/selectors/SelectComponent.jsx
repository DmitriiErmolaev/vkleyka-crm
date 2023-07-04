import React,{useContext} from 'react';
import OperatorsSelect from "./OperatorsSelect.jsx";
import CountrySelect from "./CountrySelect.jsx";

const SelectComponent = ({data, collectionType}) => {
  
  let select = null;

  if (collectionType === "operators") {
    select = <OperatorsSelect docRef={data.ref} assignedTo={data.assignedTo}/>
  }
  if (collectionType === "countries") {
    select = <CountrySelect setSelectedCountry={data.setSelectedCountry} selectedCountry={data.selectedCountry} countries={data.countries}/>
  }

  return select
}

export default SelectComponent;
