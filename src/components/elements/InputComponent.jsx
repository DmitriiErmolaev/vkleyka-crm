import React, {useState} from 'react';
import {Input} from "antd";


const InputComponent = ({text}) => {
  console.log(text)
  const [editedText, setEditedText] = useState(null)

  const handleChange = (e) => {
    console.log(e.target.value)
    setEditedText(e.target.value);
  }

  return (
    // TODO: обернуть в Form.Item
    <Input bordered={false} onChange={handleChange} value={editedText || text}/>
  );
};

export default InputComponent;