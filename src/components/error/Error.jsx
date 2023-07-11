import { Alert } from 'antd';
import React from 'react';


const Error = (name, message) => {
  return (
    <Alert
      type="error"
      message={name}
      description={message}

    />    


  );
};

export default Error;