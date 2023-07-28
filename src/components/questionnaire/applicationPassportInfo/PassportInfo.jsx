import React, {useState} from 'react';
import { Collapse, Layout } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import Question from '../Question';
import PassportInfoCollapseLabel from './PassportInfoCollapseLabel';
import ApplyOrCancel from '../ApplyOrCancel';
import { getPassportInfoQuestions, getPassportsInfoCollapseItem } from '../../../models/applications/questionnaire/questionnaire';

const PassportInfo = ({passports, appId}) => {
  const [passportInfoIsEdit, setPassportInfoIsEdit] = useState(false); // для будущей фнкции редактирования
  const firstApplicantPassport = passports[0]

  let passportsInfoPreparedData = getPassportInfoQuestions().map(question => {
    return (
      <div
        style={{display:"inline-block", width:"50%"}}
        key={question.key}
      >
        <Question question={question.questionTitle}/>
        <div style={{color:"black", font:"400 17px Jost, sans-serif"}}>{firstApplicantPassport[question.propWithAnswer]}</div>
      </div>
    )
  })

  const passportsInfoLabel = (
    <PassportInfoCollapseLabel 
      appId={appId} 
      passportsLength={passports.length}
    />
  )

  const passportsInfoLabelExtra = (
    <EditOutlined 
      className="editButton"
      style={{ fontSize: '22px', color: '#08c', marginLeft:"10px"}}
      onClick={() =>  setPassportInfoIsEdit(true)}
    /> 
  )

  const PassportsInfoCollapseItem = getPassportsInfoCollapseItem(passportsInfoLabel, passportsInfoLabelExtra, passportsInfoPreparedData)

  return (
    <Layout style={{marginBottom:"10px"}}>
      <Collapse 
        items={[PassportsInfoCollapseItem]}
        size={"middle"}
        defaultActiveKey={"personalInfo"}
        expandIcon={()=>{}} // убирает иконку стрелки, из-за чего некуда кликать, чтобы свернуть.
        collapsible="icon" // разрешаем коллапс по клику на иконку, получается что коллапс запрещен, т.к. иконки нет.
      />
      <ApplyOrCancel />
    </Layout>
  );
};

export default PassportInfo;
