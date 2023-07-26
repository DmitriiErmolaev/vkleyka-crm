import React, {useState} from 'react';
import { Radio } from 'antd';

const TypeChoiceAnswer = ({choice}) => {
  // тут планируется вложенность. Так что не все так просто здесь в response будет. Наверно как и в дроп дауне.
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

export default TypeChoiceAnswer;
