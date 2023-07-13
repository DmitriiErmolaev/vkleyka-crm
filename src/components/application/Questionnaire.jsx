import React from 'react';
import { Collapse, Layout } from 'antd';
import {nanoid} from "nanoid";



const Questionnaire = ({questionnary}) => {
  console.log(questionnary)

  let items = [];
  let lis = [];
  let newSection = "";
  questionnary.forEach((question) => {
    if( !newSection || newSection !== question.section) {
      items.push({
        key: nanoid(),
        label: question.section,
        children: <ul>{lis}</ul>,
      })
      newSection = question.section
    }
    if(question.type === "text") {
      lis.push(<li>{question.response}</li>)
    }
    if(question.type === "") {
      lis.push(<li>{question.response.pickedOption}</li>)
    }
    if(question.type === "date") {
      lis.push(<li>{new Date(question.response.seconds * 1000)}</li>)
    }
  })
  
  console.log(items)
   // Получение всех вопросов по секциям
  // const answersArray = appDoc.questionnary.answers;
  // let sections = [];
  // answersArray.forEach((answer, index) => {
  //   if(!sections.includes(answer.section)) {
  //     sections.push(answer.section);
  //   }
  //   return;
  // })
  // console.log(sections);
  return (
    
      <Collapse 
        items={items} 
        // defaultActiveKey={['1']} 
        // onChange={onChange}
      />
    
  );
};

export default Questionnaire;