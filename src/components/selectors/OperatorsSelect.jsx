import React, {useContext} from 'react';
import {Select} from "antd";
import { ProgramContext } from '../../models/context.js';
import { setApplicationOperator } from '../../models/applications/table-data-processing.js';
import { getOperatorOptions } from '../../models/operator/operators.js';
import { openNotification } from '../../models/notification/notification.js';
import { updateDocField } from '../../models/data-processing.js';

const OperatorsSelect = ({dialogueRef, docRef, assignedTo=null, transparent=true}) => {
  const {admins, notificationApi} = useContext(ProgramContext)

  const handleSelect = (value, _option) => {
    if(assignedTo === value) {
      return false;
    }
    
    try {
      updateDocField(docRef, "preparedInformation.assignedTo", value)
      // updateDocField(dialogueRef, "assignedTo", value)
      openNotification(notificationApi, "success", 'operatorChanged')
    } catch(e) {
      openNotification(notificationApi, "error", 'operatorChanged')
    }
  }
  
  const isOperatorIdExist = admins.findIndex(elem => {
    if(elem.role === "operator") {
      return elem.id === assignedTo         
    }
    return false;
  })

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
