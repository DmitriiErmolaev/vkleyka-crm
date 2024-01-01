import React, {useContext, useEffect, useState} from 'react';
import { Select } from "antd";
import { ProgramContext } from '../../models/context.js';
import { getOperatorOptions } from '../../modules/Accounts/helpers/getOperatorOptions.js';

const  OperatorsSelect = ({changeOperatorIntern, transparent, curOperator, selectIsDisabled, showSelected=false}) => {
  const { admins } = useContext(ProgramContext)
  const [ selectedOperator, setSelectedOperator ] = useState(null);

  const handleSelectClick = (e) => {
    e.stopPropagation();
  }

  const handleSelect = async (selectedValue, _option) => {
    changeOperatorIntern(selectedValue)
    if(showSelected) setSelectedOperator(selectedValue);
  }

  const options = getOperatorOptions(admins);

  return (
    <div onClick={handleSelectClick}>
      <Select
        disabled={selectIsDisabled}
        bordered={!transparent}
        value={selectedOperator || curOperator}
        placeholder="Назначить"
        options={options}
        style={{
          width: 136,
        }}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default OperatorsSelect;
