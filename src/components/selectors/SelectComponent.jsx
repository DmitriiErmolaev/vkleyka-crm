import React, {useContext} from 'react';
import {UserContext} from "../../context.js";
import OperatorsSelect from "./OperatorsSelect.jsx";
import CountrySelect from "./CountrySelect.jsx";

const SelectComponent = ({data, collectionType}) => {
  const user = useContext(UserContext)
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
