import React from 'react';
import Question from '../Question';
import TypeTextAnswer from './TypeTextAnswer';
import TypeChoiceAnswer from './TypeChoiceAnswer';
import TypeDateAnswer from './TypeDateAnswer';
import TypePhotoAnswer from './TypePhotoAnswer';
import TypeDropdownAnswer from './TypeDropdownAnswer';
import "../../../assets/questionnaire.scss"

const conponents = {
  text: TypeTextAnswer,
  date: TypeDateAnswer,
  photo: TypePhotoAnswer,
  dropdown: TypeDropdownAnswer,
  choice: TypeChoiceAnswer,
}

const QuestionnaireItem = ({question, questionIndex, setAnswersToUpdate, answersToUpdate, isEdit}) => {
  const Component = conponents[question.type];

  return (
    <div className="questionnary-item__container">
      <Question question={question.name} />
      <Component 
        questionData={question} 
        questionIndex={questionIndex} 
        setAnswersToUpdate={setAnswersToUpdate} 
        answersToUpdate={answersToUpdate} 
        isEdit={isEdit}
      />
    </div>
  );
};

export default QuestionnaireItem;
