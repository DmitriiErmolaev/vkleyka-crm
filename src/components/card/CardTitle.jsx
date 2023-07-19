import React from 'react';

const CardTitle = ({data}) => {
  return (
    <div 
      style={{ display: "flex", alignItems:"center"}}
    >
      <img 
        src={data.flagUrl} 
        alt="флаг страны" 
        style={{display:"block", marginRight:"10px", }}
      />
      {data.cardTitle}
    </div>
  )
};

export default CardTitle;
