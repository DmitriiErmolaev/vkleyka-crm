import React, {useState} from 'react';
import { Radio } from 'antd';

const Choice = ({choice}) => {
  const [selectedRadio, setSelectedRadio] = useState(null);

  const handleChange = (e) => {
    setSelectedRadio(e.target.value);
  }

  return (
    <Radio.Group name="choice" onChange={handleChange} value={selectedRadio || choice} buttonStyle={"solid"}>
      <Radio value={true}>Да</Radio>
      <Radio value={false}>Нет</Radio>
    </Radio.Group>
  );
};

export default Choice;