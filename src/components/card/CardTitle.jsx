import React from 'react';
import Spinner from '../spinner/Spinner';

const CardTitle = ({cardTitle, flagUrl}) => {

  return (
    <div
      style={{ display: "flex", alignItems:"center"}}
    >
      <img
        src={flagUrl}
        alt="флаг страны"
        style={{display:"block", marginRight:"10px", }}
      />
      {cardTitle}
    </div>
  )
};

export default CardTitle;
