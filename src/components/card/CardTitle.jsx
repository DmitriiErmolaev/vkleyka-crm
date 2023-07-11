import React, {useEffect, useState} from 'react';
import { getFlagUrl } from '../../models/applications/applications';
import { getFileRef } from '../../models/firebase';


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