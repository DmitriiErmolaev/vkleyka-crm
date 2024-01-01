import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApplicationWorkArea from './ApplicationWorkArea';

// DELETE: Удалить компонент? хз для чего осздавал, не использую.
const ApplicationContainer = () => {
  const { clientId, appId } = useParams();
  const [ clientIdState, setClientIdState ] = useState(clientId)
  

  useEffect(() => {
    console.log(123)
    if (clientIdState !== clientId) setClientIdState(clientId)
  },[clientId, clientIdState])
  
  

  if (clientIdState !== clientId) {
    return null;
  }

  return (
    <ApplicationWorkArea clientId={clientIdState}/>
  );
};

export default ApplicationContainer;
