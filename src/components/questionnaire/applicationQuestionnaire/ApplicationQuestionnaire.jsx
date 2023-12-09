import React,{useState, useContext, useEffect} from 'react';
import { Collapse, Layout, Typography, Empty, theme, ConfigProvider } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import QuestionnaireItem from './QuestionnaireItem';
import ApplyOrCancel from '../ApplyOrCancel';
import { getCollapseItems, updateQuestionnaireAnswers } from '../../../models/applications/questionnaire/questionnaire';
import { ProgramContext, ApplicationStatus } from '../../../models/context';
import { openNotification } from '../../../models/notification/notification';
import '../../../assets/application-questionnaire.scss'
const { useToken } = theme;
const {Title} = Typography;

const ApplicationQuestionnaire = ({questionnaire, appRef}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentPanelOpened, setCurrentPanelOpened] = useState([]);
  const [answersToUpdate, setAnswersToUpdate] = useState([]); // {newResponse: any, index: number,}
  const {notificationApi} = useContext(ProgramContext)
  const {curAppStatus} = useContext(ApplicationStatus);
  const {token} = useToken();

  useEffect(() => {
    if (curAppStatus === 2) cancelChanges();
  },[curAppStatus])

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

  if (!questionnaire || questionnaire.length === 0) {
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
      <ConfigProvider
        theme={{
          token: {
            // colorBorder: '',
          },
          // components: {
          //   Collapse: {
          //     headerBg: '#E9F3FF',
          //     contentBg: '#fff',
          //   }
          // },
        }}
      >
        <Collapse
          bordered={false}
          activeKey={currentPanelOpened}
          items={questionnaireItems}
          size={"middle"}
          onChange={panelOpen}
        />
      </ConfigProvider>
    )
  }


  return (
    <Layout style={{}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Title level={3}>Анкета</Title>
        {
          questionnaire && (curAppStatus !== 2) ?  (
            <EditOutlined
              className="interactive-icons"
              style={{ fontSize: '22px', color: '#08c', marginLeft:"10px", marginRight:"10px"}}
              onClick={() =>  setIsEdit(true)}
            />
          ) : (
            null
          )
        }
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
