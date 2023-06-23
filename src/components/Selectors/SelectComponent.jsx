import React from 'react';
import OperatorsSelect from "./OperatorsSelect.jsx";
import CountrySelect from "./CountrySelect.jsx";

const SelectComponent = ({data, collectionType}) => {
  let select = null;

  if (collectionType === "operators") {
    select = <OperatorsSelect id={data.id} operator={data.viser}/>
  }
  if (collectionType === "countries") {
    select = <CountrySelect setSelectedCountry={data.setSelectedCountry} selectedCountry={data.selectedCountry}/>
  }

  return (
    <div>
      {select}
    </div>
  );
};

export default SelectComponent;
