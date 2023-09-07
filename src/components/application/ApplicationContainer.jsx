import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';

const ApplicationContainer = () => {
  const { clientId, appId } = useParams();
  const [clientIdState, setClientIdState] = useState(clientId)

  useEffect(() => {
    if (clientIdState !== clientId) setClientIdState(clientId)
  },[clientId, clientIdState])
  
  

  if (clientIdState !== clientId) {
    return null;
  }

  return (
    <ApplicationForm  clientId={clientIdState}/>
  );
};

export default ApplicationContainer;
