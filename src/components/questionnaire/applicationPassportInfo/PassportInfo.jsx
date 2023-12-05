import React, {useState, useContext } from 'react';
import { Collapse, Image, Layout } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import Question from '../Question';
import PassportInfoCollapseLabel from './PassportInfoCollapseLabel';
import ApplyOrCancel from '../ApplyOrCancel';
import { getPassportInfoQuestions, getPassportInfoValue, getPassportsInfoCollapseItem } from '../../../models/applications/questionnaire/questionnaire';
import { ApplicationStatus } from '../../../models/context';
import { getDownloadURL }from 'firebase/storage';
import '../../../assets/passport-info.scss'
import { getFileRef, getRootStorageRef } from '../../../models/firebase';
import PassportImg from './PassportImg';
import dayjs from 'dayjs';

const PassportInfo = ({passports, appId}) => {
  const {curAppStatus} = useContext(ApplicationStatus);
  const [passportInfoIsEdit, setPassportInfoIsEdit] = useState(false); // для будущей фнкции редактирования
  
  const content = passports.map((passport, index) => {
    const applicantTitle = (
      <div key={`applicant-${index}-passport-title`} className="applicant-passport__title">
        {`Заявитель №${index + 1}. ${passport.first_name} ${passport.last_name}`}
      </div>
    )
    let passportsInfoPreparedData = getPassportInfoQuestions().map(question => {
      // const answer = getPassportInfoValue(question, passport[question.propWithAnswer]);
      let answer = ''
      const value = passport[question.propWithAnswer];
      if(question.answerType === 'date') {
        // TODO: временное решение. Удалить когда все даты в паспортной части будут таймштампами а не текстом
        console.log(typeof value)
        if (typeof value === 'string') {
          answer = value;
        } else {
          answer = dayjs.unix(value.seconds).format('DD.MM.YYYY');
        }
      }
      if(question.answerType === 'photo') {
        answer = <PassportImg path={value}/>
      }
      // let answer = passport[question.propWithAnswer];
      // if (question.propWithAnswer === 'image_url') {
      //   answer = <PassportImg path={passport[question.propWithAnswer]}/>
      // }
      // if (question.propWithAnswer === 'image_url')
      return (
        <div
          style={{display:"inline-block", width:"50%"}}
          key={question.key}
        >
          <Question question={question.questionTitle}/>
          <div style={{color:"black", font:"400 17px Jost, sans-serif"}}>{answer}</div>
        </div>
      )
    })

    return (
      <div key={`applicant-${index}-passport`} className="applicant-passport">
        {applicantTitle}
        {passportsInfoPreparedData}
      </div>
    )

  })

  const passportsInfoLabel = (
    <PassportInfoCollapseLabel 
      appId={appId}
      passportsLength={passports.length}
    />
  )

  const passportsInfoLabelExtra = curAppStatus !== 2 ? (
    <EditOutlined
      className="interactive-icons"
      style={{ fontSize: '22px', color: '#08c', marginLeft:"10px"}}
      onClick={() =>  setPassportInfoIsEdit(true)}
    />
  ) : (
    null
  )

  const passportsInfoCollapseItems = getPassportsInfoCollapseItem(passportsInfoLabel, passportsInfoLabelExtra, content)

  return (
    <Layout style={{marginBottom:"10px"}}>
      <Collapse
        bordered={false}
        items={[passportsInfoCollapseItems]}
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
