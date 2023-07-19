import React, {useState} from 'react';
import { Collapse, Layout, Typography, Row, Col } from 'antd';
import InputComponent from '../elements/InputComponent';
import DatePickerComponent from '../elements/DatePickerComponent';
import ImageComponent from '../elements/ImageComponent';
import Choice from '../elements/Choice';
import ApplyOrCancel from './ApplyOrCancel';
import SelectComponent from '../selectors/SelectComponent';
import { updateQuestionnaireAnswers } from '../../models/applications/questionnarie/questionnaire';
import { EditOutlined } from "@ant-design/icons";
import "../../assets/questionnarie.scss"
const {Title, Paragraph} = Typography;
// const panelStyle = {
//   marginBottom: 20,
//   background: "#E9F3FF",
//   // borderRadius: 0,
//   border: "none",
// }

const Questionnaire = ({questionnaire, passports, appRef, appId}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [answersToUpdate, setAnswersToUpdate] = useState([]);
  const [currentPanelOpened, setCurrentPanelOpened] = useState([]);  
  console.log(answersToUpdate)
  let lis = {};

  const panelOpen = (panel) => {
    setCurrentPanelOpened(panel)
  }

  const applyChanges = async (e) => {
    await updateQuestionnaireAnswers(appRef, questionnaire, answersToUpdate)
    setAnswersToUpdate([]);
    setIsEdit(false)
  }

  const cancelChanges = () => {
    setAnswersToUpdate([]);
    setIsEdit(false)
  }

  questionnaire.forEach((question, index) => {
    if(lis[question.section] === undefined) {
      lis[question.section] = [];
    }

    if(question.type === "text") {
      lis[question.section].push(
        <li>
          <h3>
            {`${question.name}:`}
          </h3>
          <p>
            <InputComponent 
              text={question.response} 
              index={index} 
              setAnswersToUpdate={setAnswersToUpdate} 
              answersToUpdate={answersToUpdate} 
              isEdit={isEdit}
            />
          </p>
        </li>
      )
    }
    if(question.type === "dropdown") {
      lis[question.section].push(<li><h3>{`${question.name}:`}</h3><p>{<SelectComponent data={{response: question.response, isEdit: isEdit}} collectionType={"questionnaire"}/>}</p></li>)
    }
    if(question.type === "photo") {

      lis[question.section].push(<li><h3>{`${question.name}:`}</h3><p>{<ImageComponent path={question.response} index={index}/>}</p></li>)
    }
    if(question.type === "date") {
      lis[question.section].push(<li><h3>{`${question.name}:`}</h3><p>{<DatePickerComponent s={question.response.seconds} index={index}  setAnswersToUpdate={setAnswersToUpdate} 
      answersToUpdate={answersToUpdate} 
      setIsEdit={setIsEdit} 
      isEdit={isEdit}/>}</p></li>)
    }
    if(question.type === "list") {
    }
  })

  const applicationInfoContent = [
    {
      title: "Имя, латиницей",
      value: passports[0].first_name,
    },
    {
      title: "Фамилия, латиницей",
      value: passports[0].last_name,
    },
    {
      title: "Дата рождения",
      value: passports[0].date_of_birth,
    },
    {
      title: "Пол",
      value: passports[0].gender,
    },
    {
      title: "Гражданство",
      value: passports[0].citizenship,
    },
    {
      title: "Место рождения",
      value: passports[0].place_of_birth,
    },
    {
      title: "Номер паспорта",
      value: passports[0].passport_number,
    },
    {
      title: "Дата выдачи",
      value: passports[0].issue_date,
    },
    {
      title: "Орган, который выдал",
      value: passports[0].issued_by,
    },
    {
      title: "Действителен до",
      value: passports[0].valid_until,
    },
    {
      title: "ИИН",
      value: passports[0].IIN,
    },
  ]

  const applicantInfoHeader = (
    <Row gutter={8} align="middle">
      <Col>
        <div className="person__title">
          Заявка {appId}
        </div>
      </Col>
      <Col>
        <div className="person__applicants-num">
          количество заявителей: {passports.length}
        </div>
      </Col>
    </Row>
  )

  const personLis = applicationInfoContent.map((info) => {
    return <li><div className="person-info__question">{info.title}</div><Paragraph>{info.value}</Paragraph></li>
  })

  let applicantInfo = [{
    key: "personalInfo", // number
    label: applicantInfoHeader,
    extra: 
      <EditOutlined 
        className="editButton"
        style={{ fontSize: '22px', color: '#08c', marginLeft:"10px"}}
        onClick={() =>  setIsEdit(true)}
      /> ,
    // style: panelStyle,
    children: <ul>{personLis}</ul>,
  }]

  const pairs = Object.entries(lis)
  const items = pairs.map((section, index) => {
    return {
      key: index, // number
      label: section[0],
      // style: panelStyle,
      children: <ul>{section[1]}</ul>,
    }
  })
 
  return (
    <Layout style={{backgroundColor:"white", color:"#0F6CA5"}}>
      <Layout style={{marginBottom:"10px"}}>
        <Collapse 
          items={applicantInfo}
          size={"middle"}
          defaultActiveKey={"personalInfo"}
          expandIcon={()=>{}} // убирает иконку стрелки 
          collapsible="icon" // разрешаем коллапс по клику на иконку, получается что коллапс запрещен, т.к. иконки нет.
        />
      </Layout>
      
      <Typography>
        <Title level={3}>Анкета</Title>
      </Typography>
      <Layout style={{}}>
        <Collapse 
          activeKey={currentPanelOpened}
          items={items} 
          size={"middle"}
          // bordered={false}
          // defaultActiveKey={['1']} 
          onChange={panelOpen}
        />
      </Layout>
      <ApplyOrCancel isEdit={isEdit} setIsEdit={setIsEdit} applyChanges={applyChanges} cancelChanges={cancelChanges}/>
    </Layout>
  );
};

export default Questionnaire;

