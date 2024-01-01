import React from 'react';
import "../../../assets/question.scss";

const Question = ({question, isNested=false}) => {
  const nested = isNested ? 'nested' : ''; // если потребуется стилизовать доп вопросы. 
  
  return (
    <h3 className={`person-info__question ${nested}`}>
      {question}:
    </h3>
  );
};

export default Question;
