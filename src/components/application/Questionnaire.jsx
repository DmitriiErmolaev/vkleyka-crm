import React from 'react';
import { Collapse, Layout } from 'antd';
import {nanoid} from "nanoid";
import InputComponent from '../elements/InputComponent';
import DatePickerComponent from '../elements/DatePickerComponent';
// const panelStyle = {
//   marginBottom: 20,
//   background: "#E9F3FF",
//   // borderRadius: 0,
//   border: "none",


// }

const Questionnaire = ({questionnary}) => {
  console.log(questionnary)

  let lis = {

  };
  let newSection = "";

  questionnary.forEach((question) => {
    if(lis[question.section] === undefined) {
      lis[question.section] = [];
    }

    if(question.type === "text") {
      lis[question.section].push(<li><h3>{`${question.name}:`}</h3><p>{<InputComponent text={question.response}/>}</p></li>)
    }
    // if(question.type === "dropdown") {
    //   lis[question.section].push(<li>{question.response.pickedOption}</li>)
    // }
    if(question.type === "photo") {
      lis[question.section].push(<li><h3>{`${question.name}:`}</h3><p>{}</p></li>)
    }
    if(question.type === "date") {
      lis[question.section].push(<li><h3>{`${question.name}:`}</h3><p>{<DatePickerComponent ms={question.response.seconds}/>}</p></li>)
    }
  })


  const pairs = Object.entries(lis)
  const items = pairs.map((section) => {
    return {
      key: nanoid(),
      label: section[0],
      // style: panelStyle,
      children: <ul>{section[1]}</ul>,
    }
  })
 
  return (
    <div style={{backgroundColor:"white", color:"#0F6CA5"}}>
      <Collapse 
        items={items} 
        size={"middle"}
        // bordered={false}
        // defaultActiveKey={['1']} 
        // onChange={onChange}
      />
    </div>
  );
};

export default Questionnaire;

