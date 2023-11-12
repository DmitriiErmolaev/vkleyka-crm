import React from 'react';
import {Layout} from 'antd';
import PassportInfo from './applicationPassportInfo/PassportInfo';
import ApplicationQuestionnaire from './applicationQuestionnaire/ApplicationQuestionnaire';

// const panelStyle = { // NOTE: для стилизации панелей collapse
//   marginBottom: 20,
//   background: "#E9F3FF",
//   // borderRadius: 0,
//   border: "none",
// }

const QuestionnaireSection = ({questionnaire, passports, appRef, appId}) => {

  return (
    <div style={{ color:"#0F6CA5"}}>
      <PassportInfo
        passports={passports}
        appId={appId}
      />
      <ApplicationQuestionnaire
        questionnaire={questionnaire}
        appRef={appRef}
      />
    </div>
  );
};

export default QuestionnaireSection;
