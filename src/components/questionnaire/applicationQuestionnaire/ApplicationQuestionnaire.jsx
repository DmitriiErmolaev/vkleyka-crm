import React,{useState, useContext} from 'react';
import { Collapse, Layout, Typography, Empty } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import QuestionnaireItem from './QuestionnaireItem';
import ApplyOrCancel from '../ApplyOrCancel';
import { getCollapseItems, updateQuestionnaireAnswers } from '../../../models/applications/questionnaire/questionnaire';
import { ProgramContext } from '../../../models/context';
import { openNotification } from '../../../models/notification/notification';
import '../../../assets/application-questionnaire.scss'
const {Title} = Typography;

const ApplicationQuestionnaire = ({questionnaire, appRef}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentPanelOpened, setCurrentPanelOpened] = useState([]);
  const [answersToUpdate, setAnswersToUpdate] = useState([]);
  const {notificationApi} = useContext(ProgramContext)

  const applyChanges = async (e) => {
    try {
      // TODO: функция, проверяющая answersToUpdate на заполенность всех обязательных вопросов
      await updateQuestionnaireAnswers(appRef, questionnaire, answersToUpdate)
      openNotification(notificationApi, "success", 'questionnaireUpdated')
      setAnswersToUpdate([]);
      setIsEdit(false)
    } catch (e) {
      openNotification(notificationApi, "error", 'questionnaireUpdated')
    }
  }

  const cancelChanges = () => {
    setAnswersToUpdate([]);
    setIsEdit(false)
  }

  const panelOpen = (panel) => {
    setCurrentPanelOpened(panel)
  }

  
  let questionnaireToRender = null;

  if (!questionnaire) {
    questionnaireToRender = (
      <Empty  
        description={<span>Анкета пока не заполнена...</span>}
        rootClassName="empty"
      />
      
    )
  } else {
    let questionnairePreparedData = {};
    questionnaire.forEach((question, questionIndex) => {
      if(!questionnairePreparedData[question.section]) {
        questionnairePreparedData[question.section] = [];
      }
    
      questionnairePreparedData[question.section].push(
        <QuestionnaireItem 
          key={questionIndex}
          question={question} 
          questionIndex={questionIndex} 
          setAnswersToUpdate={setAnswersToUpdate} 
          answersToUpdate={answersToUpdate} 
          isEdit={isEdit}
        />
      )
    })
  
    const questionnaireItems = getCollapseItems(questionnairePreparedData);

    questionnaireToRender = (
      <Collapse 
        activeKey={currentPanelOpened}
        items={questionnaireItems} 
        size={"middle"}
        onChange={panelOpen}
      /> 
    )
  }

  
  return (
    <Layout style={{}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Title level={3}>Анкета</Title>
        {questionnaire ?  (
          <EditOutlined 
            className="interactive-icons"
            style={{ fontSize: '22px', color: '#08c', marginLeft:"10px", marginRight:"10px"}}
            onClick={() =>  setIsEdit(true)}
          />
        ) : (
          null
        )}
      </div>
      {questionnaireToRender}
      <ApplyOrCancel 
        isEdit={isEdit} 
        setIsEdit={setIsEdit} 
        applyChanges={applyChanges} 
        cancelChanges={cancelChanges}
      />
    </Layout>
  );
};

export default ApplicationQuestionnaire;
