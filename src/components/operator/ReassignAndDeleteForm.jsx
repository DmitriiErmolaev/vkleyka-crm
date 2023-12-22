import React, { useContext } from 'react';
import { Button, Select } from 'antd';
import { OperatorsContext, ProgramContext } from '../../models/context';
import { getOperatorOptions } from '../../models/operator/operators';
import '../../assets/operator/reassign-and-delete-form.scss'
import { findOperatorName } from '../../models/operator/operators-data-processing';

const ReassignAndDeleteForm = ({setSelectedOperator, selectedOperator, reassignAndDelete}) => {
  const { admins } = useContext(ProgramContext)
  const { deletingOperatorName } = useContext(OperatorsContext)

  const handleSelect = (selectedValue, _option) => {
    setSelectedOperator(selectedValue)
  }

  const applyNewOperator = () => {
    reassignAndDelete();
  }

  const options = getOperatorOptions(admins);
  
  return (
    <div className='reassign'>
      <div className="reassign__title">
        Кому перенаправить все заявки и чаты <span className="reassign__operator-to-be-deleted">{deletingOperatorName}</span>
      </div>
      <div className="reassign__select">
        <Select
          value={selectedOperator}
          placeholder="Выберите"
          options={options}
          style={{
            width: 136,
          }}
          onSelect={handleSelect}
        />
      </div>
      <div className='reassign__button'>
        <Button type='primary' onClick={applyNewOperator}>Подтвердить</Button>
      </div>
    </div>
  );
};

export default ReassignAndDeleteForm;
