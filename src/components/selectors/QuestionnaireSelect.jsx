import React from 'react';
import { Select } from 'antd';
import { getQuestionnaireSelectOptions } from '../../models/applications/questionnarie/questionnaire';
import InputComponent from '../elements/InputComponent';



const QuestionnaireSelect = ({response, isEdit}) => {
  const options = getQuestionnaireSelectOptions(response)

  const subQuestions = response.answers.map((subQuestion, index) => {
    console.log(subQuestion)
    return <li>
    <h3 style={{color:"blue"}}>
      {`Доп: ${subQuestion.question}:`}
    </h3>
    <p>
      <InputComponent 
        text={subQuestion.answer} 
        index={index} 
        // setAnswersToUpdate={setAnswersToUpdate} 
        // answersToUpdate={answersToUpdate} 
        isEdit={isEdit}
        isNested={true}
      />
    </p>
  </li>
  })

  return (
    <>
    <Select 
      style={{
        width: 200,
      }}
      value={response.pickedOption}
      placeholder=""
      options={options} 
      disabled={!isEdit}
      // onSelect={handleSelect}
    />
    <ul
      // стили не срабатывают
    > 
      {subQuestions}
    </ul>
    
    </>
  )
};

export default QuestionnaireSelect;