import React, { memo } from 'react';
import {Layout} from 'antd';
import PassportInfo from './applicationPassportInfo/PassportInfo';
import ApplicationQuestionnaire from './applicationQuestionnaire/ApplicationQuestionnaire';

// const panelStyle = { // NOTE: для стилизации панелей collapse
//   marginBottom: 20,
//   background: "#E9F3FF",
//   // borderRadius: 0,
//   border: "none",
// }

const QuestionnaireSection = memo(({questionnaire, passports, appRef, appId}) => {
  console.log('снова рендер')
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
});

export default QuestionnaireSection;
