import React, {useState, useEffect, useContext} from 'react';
import {Select} from "antd";
import { AdminsContext } from '../../models/context.js';
import { setApplicationOperator } from '../../models/applications/table-data-processing.js';
import { getSelectOptions } from '../../models/data-processing.js';

const OperatorsSelect = ({docRef, assignedTo, transparent=true}) => {
  const {admins} = useContext(AdminsContext)
  const [selectedOperator, setSelectedOperator] = useState(null);

  useEffect(() => {
    if(selectedOperator) {
      setApplicationOperator(docRef, "preparedInformation.assignedTo", selectedOperator)
      setSelectedOperator(null)
    }
  }, [selectedOperator, docRef])

  const handleSelect = (_, option) => {
    setSelectedOperator(option.label)
  }
  
  const options = getSelectOptions(admins, "operatorsSelect");
  
  return (
    <div>
      <Select 
        bordered = {!transparent}
        value={assignedTo || null}
        placeholder="Назначить визовика"
        options={options} 
        style={{
          maxWidth: 160,
        }}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default OperatorsSelect;
