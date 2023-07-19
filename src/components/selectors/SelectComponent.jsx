import React from 'react';
import OperatorsSelect from "./OperatorsSelect.jsx";
import CountrySelect from "./CountrySelect.jsx";
import StatusesSelect from "./StatusesSelect.jsx";
import QuestionnaireSelect from './QuestionnaireSelect.jsx';
const SelectComponent = ({data, collectionType}) => {
  let select = null;
  
  if (collectionType === 'statuses') {
    select = <StatusesSelect curStatus={data.curAppStatus} appDocId={data.appDocId}/>
  }
  if (collectionType === 'operators') {
    select = <OperatorsSelect docRef={data.ref} assignedTo={data.assignedTo}/>
  }
  if (collectionType === 'countries') {
    select = <CountrySelect setSelectedCountry={data.setSelectedCountry} selectedCountry={data.selectedCountry} countries={data.countries}/>
  }
  if (collectionType === 'questionnaire') {
    select = <QuestionnaireSelect response={data.response} isEdit={data.isEdit}/>
  }

  return select
}

export default SelectComponent;
