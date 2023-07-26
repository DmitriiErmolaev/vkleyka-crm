import React from 'react';
import { Select } from 'antd';
import TypeTextAnswer from './TypeTextAnswer';
import Question from '../Question';
import { 
  prepareChanges, 
  getChangedValue, 
  getQuestionnaireSelectOptions 
} from '../../../models/applications/questionnaire/questionnaire';

const TypeDropdownAnswer = ({questionData, questionIndex, setAnswersToUpdate, answersToUpdate, isEdit}) => {
  
  const handleSelect = (value,  optionInstance) => {
    const newAnswers = questionData.options[value].questions.map(question => {
      return {
        question: question.question,
        answer: "",
      }
    })
    const newResponse = {pickedOption: value, pickedOptionName: optionInstance.label, answers:newAnswers}
    const preparedChanges = prepareChanges(answersToUpdate, newResponse, questionIndex);
    setAnswersToUpdate(preparedChanges);
  }

  const alreadyChangedResponse = getChangedValue(answersToUpdate, questionIndex);
  const displayedValue = (alreadyChangedResponse !== false) ? alreadyChangedResponse.pickedOption : questionData.response.pickedOption;
  const answersToDisplay = (alreadyChangedResponse !== false) ? alreadyChangedResponse.answers : questionData.response.answers;
  const options = getQuestionnaireSelectOptions(questionData.options)
  const subQuestions = answersToDisplay.map((subQuestion, subQuestionIndex) => {
   
    return (
      <div key={`${questionIndex}-sub-${subQuestionIndex}`} style={{marginLeft:"20px"}} >
        <Question question={subQuestion.question} isNested={true}/>
        <TypeTextAnswer 
          questionData={{response: subQuestion.answer}} // потому что внутри из questionData берется response с текстом
          questionIndex={questionIndex} 
          setAnswersToUpdate={setAnswersToUpdate} 
          answersToUpdate={answersToUpdate} 
          nestedOptions={{
            isNested: true,
            nestedQuestionIndex: subQuestionIndex,  
            dropdownQuestionData: questionData, // TODO: взять pickedOption отсюда. Проверить, не будут ли путаться ответы с разными опциями дропдауна. тест выбранной опции взять из options по pickedValue (это индекс опции)
          }}
          isEdit={isEdit}
        />
      </div>
    )
  })

  return (
    <>
      <Select 
        style={{
          width: 200,
        }}
        value={displayedValue} // индекс опции
        placeholder=""
        options={options} 
        disabled={!isEdit}
        onSelect={handleSelect}
      />
      {subQuestions}  
    </>
  )
};

export default TypeDropdownAnswer;
