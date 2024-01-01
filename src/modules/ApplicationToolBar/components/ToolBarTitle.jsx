import React from 'react';

const ToolBarTitle = ({cardTitle, flagUrl}) => {
  return (
    <div
      style={{ display: "flex", alignItems:"center"}}
    >
      <img
        src={flagUrl}
        height='33px'
        alt="флаг страны"
        style={{display:"block", marginRight:"10px", }}
      />
      {cardTitle}
    </div>
  )
};

export default ToolBarTitle;
