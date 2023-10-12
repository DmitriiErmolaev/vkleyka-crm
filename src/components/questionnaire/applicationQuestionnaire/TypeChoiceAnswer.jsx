import React, {useState} from 'react';
import { Radio } from 'antd';
import { getChangedValue, getQuestionnaireSelectOptions, prepareChanges } from '../../../models/applications/questionnaire/questionnaire';

const TypeChoiceAnswer = ({questionData, questionIndex, setAnswersToUpdate, answersToUpdate, isEdit}) => {

  const handleChange = (e) => {
    const newResponse = {pickedOption: e.target.value, pickedOptionName: questionData.options[e.target.value].option}
    const preparedChanges = prepareChanges(answersToUpdate, newResponse, questionIndex);
    setAnswersToUpdate(preparedChanges);
  }
  const alreadyChangedResponse = getChangedValue(answersToUpdate, questionIndex);
  const displayedValue = (alreadyChangedResponse) ? alreadyChangedResponse.pickedOption : questionData.response.pickedOption;

  // const radioButtons = questionData.options.map((option, index) => {
  //   return <Radio key={} value={index}>{option.option}</Radio>
  // })

  const options = getQuestionnaireSelectOptions(questionData.options)

  return (
    <Radio.Group 
      name="choice" 
      disabled={!isEdit}
      onChange={handleChange} 
      value={displayedValue} 
      optionType="button" 
      options={options} 
    />
      
  );
};

export default TypeChoiceAnswer;
