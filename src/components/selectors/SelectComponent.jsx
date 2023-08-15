import React from 'react';
import OperatorsSelect from "./OperatorsSelect.jsx";
import CountrySelect from "./CountrySelect.jsx";
import StatusesSelect from "./StatusesSelect.jsx";

const SelectComponent = ({data, collectionType}) => {
  let select = null;
  
  if (collectionType === 'statuses') {
    select = <StatusesSelect curStatus={data.curAppStatus} appDocId={data.appDocId}/>
  }
  if (collectionType === 'operators') {
    select = <OperatorsSelect dialogueRef={data.dialogueRef} docRef={data.ref} assignedTo={data.assignedTo} transparent={data.transparent}/>
  }
  if (collectionType === 'countries') {
    select = <CountrySelect setSelectedCountry={data.setSelectedCountry} selectedCountry={data.selectedCountry} countries={data.countries}/>
  }

  return select
}

export default SelectComponent;
