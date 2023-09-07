import React from 'react';
import OperatorsSelect from "./OperatorsSelect.jsx";
import CountrySelect from "./CountrySelect.jsx";
import StatusesSelect from "./StatusesSelect.jsx";

const SelectComponent = ({data, collectionType}) => {
  let select = null;
  
  if (collectionType === 'statuses') {
    select = <StatusesSelect curStatus={data.curAppStatus} appDocId={data.appDocId} currentClientApplications={data.currentClientApplications} dialogueSnap={data.dialogueSnap} assignedTo={data.assignedTo}/>
  }
  if (collectionType === 'operators') {
    select = <OperatorsSelect dialogueSnap={data.dialogueSnap} clientApplicationsSnaps={data.clientApplicationsSnaps} assignedTo={data.assignedTo} transparent={data.transparent} disabledProp={data.disabledProp}/>
  }
  if (collectionType === 'countries') {
    select = <CountrySelect setSelectedCountry={data.setSelectedCountry} selectedCountry={data.selectedCountry} countries={data.countries}/>
  }

  return select
}

export default SelectComponent;
