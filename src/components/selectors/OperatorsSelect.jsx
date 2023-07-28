import React, {useContext} from 'react';
import {Select} from "antd";
import { ProgramContext } from '../../models/context.js';
import { setApplicationOperator } from '../../models/applications/table-data-processing.js';
import { getOperatorOptions } from '../../models/operator/operators.js';
import { openNotification } from '../../models/notification/notification.js';

const OperatorsSelect = ({docRef, assignedTo=null, transparent=true}) => {
  const {admins, api} = useContext(ProgramContext)

  const handleSelect = (value, _option) => {
    if(assignedTo === value) {
      return false;
    }
    try {
      setApplicationOperator(docRef, "preparedInformation.assignedTo", value)
      openNotification(api, "success", 'operatorChanged')
    } catch(e) {
      openNotification(api, "error", 'operatorChanged')
    }
  }
  
  const isOperatorIdExist = admins.findIndex((elem => {
    if(elem.role === "operator"){
      return elem.id === assignedTo         
    }
  }))

  const options = getOperatorOptions(admins);
  const value = isOperatorIdExist !== -1 ? assignedTo : null
  return (
    <div>
      <Select 
        bordered = {!transparent}
        value={value}
        placeholder="Назначить визовика"
        options={options} 
        style={{
          width: 176,
        }}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default OperatorsSelect;
