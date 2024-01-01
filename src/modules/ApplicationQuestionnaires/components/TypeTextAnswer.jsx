import React from 'react';
import { Input } from "antd";
import { prepareChanges } from '../helpers/prepareChanges.js';
import { checkChangedValueExists } from '../helpers/checkChangedValueExists.js';

const TypeTextAnswer = ({questionData, questionIndex, setAnswersToUpdate, answersToUpdate, isEdit, nestedOptions={isNested:false}}) => {
  const handleChange = (e) => {
    // Если редактируется поле, которое является вложенным, то сперва проверим, есть ли для него в answersToUpdate
    // уже созданный объект, чтобы сохранять редактируемое значение. Если нет - создать.
    if(nestedOptions.isNested) {
      const isQuestionAlreadyChanged = answersToUpdate.findIndex(question => {
        return question.index === questionIndex;
      })
      if(isQuestionAlreadyChanged === -1) {
        const response = nestedOptions.dropdownQuestionData.response;
        const preparedChanges = prepareChanges(answersToUpdate, response, questionIndex);
        setAnswersToUpdate(preparedChanges);
      }
    }

    setAnswersToUpdate((prev) => {
      const preparedChanges = prepareChanges(prev, e.target.value, questionIndex, nestedOptions);
      return preparedChanges;
    });
  }

  const alreadyChangedResponse = checkChangedValueExists(answersToUpdate, questionIndex, nestedOptions);
  const displayedValue = (alreadyChangedResponse !== false) ? alreadyChangedResponse : questionData.response;

  return isEdit ? (
    <div>
      <Input bordered={true} onChange={handleChange} value={displayedValue}/>
    </div>
  ) : (
    <div style={{color:"black", font:"400 17px Jost, sans-serif"}}>
        {questionData.response}
    </div>
  )
};

export default TypeTextAnswer;
