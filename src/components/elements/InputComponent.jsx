import React from 'react';
import {Input, Typography} from "antd";
import { prepareChanges, getChangedValue } from '../../models/applications/questionnarie/questionnaire';
const { Title, Paragraph, Text, Link } = Typography;


const InputComponent = ({text, index, setAnswersToUpdate, answersToUpdate, isEdit, isNested}) => {

  // TODO: передавать параметр, вложенный ли это инпут. У дропдауна или чойса.
  // TODO: prepareChanges должен в таком случае вносить в список измененных response который содержит все новое.
  const handleChange = (e) => {
    const preparedChanges = prepareChanges(answersToUpdate, e.target.value, index);
    setAnswersToUpdate(preparedChanges);
  }

  const alreadyChangedValue = isNested || getChangedValue(answersToUpdate, index);
  
  const displayedValue = (alreadyChangedValue !== false) ? alreadyChangedValue : text;



  return isNested ? (
    <Typography>
      <Paragraph>
        {text}
      </Paragraph>
    </Typography>
  ) : isEdit ? (
    <Input bordered={true} onChange={handleChange} value={displayedValue}/>
  ) : (
    <Typography>
      <Paragraph>
        {text}
      </Paragraph>
    </Typography>
  )
};

export default InputComponent;