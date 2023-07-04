import React, {useState, useEffect, useContext} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import {collection,query, orderBy, updateDoc, doc} from "firebase/firestore";
import {firestore} from "../../models/firebase.js";
import {Select} from "antd";
import { AdminsContext } from '../../models/context.js';
import { GLOBAL_ROLES } from '../../models/role-based-rules.js';
import { setApplicationOperator } from '../../models/applications/table-data-processing.js';
import { operatorOptionMatrix } from '../../models/operator/operators.js';
import { getSelectOptions } from '../../models/data-processing.js';

const OperatorsSelect = ({docRef, assignedTo}) => {
  const {admins} = useContext(AdminsContext)
  const [selectedOperator, setSelectedOperator] = useState(null);

  useEffect(() => {
    if(selectedOperator) {
      setApplicationOperator(docRef, "preparedInformation.assignedTo", selectedOperator)
      setSelectedOperator(null)
    }
  }, [selectedOperator])

  const handleSelect = (value, option) => {
    setSelectedOperator(option.label)
  }
  const options = getSelectOptions(admins, "operatorsSelect");
  
  return (
    <div>
      <Select 
        bordered = {false}
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
