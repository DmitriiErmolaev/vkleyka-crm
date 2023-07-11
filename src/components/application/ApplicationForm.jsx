import React, {useState, useEffect} from "react";
import {collection} from "firebase/firestore"
import {uploadBytes, ref} from "firebase/storage"
import {useDocument} from "react-firebase-hooks/firestore"
import {useParams, useLocation} from "react-router-dom";
import {firestore, storage} from "../../models/firebase"
import {Layout, Button,Divider, Card,  Upload, Typography, Descriptions, Row,Col, Space, Spin, Progress, Select } from "antd";
import Chat from "../chat/Chat";
import SelectComponent from "../selectors/SelectComponent";
import CardComponent from "../card/CardComponent";
import { getAppRefById } from "../../models/applications/applications";
import { getAllFieldsFromDocSnapshot } from "../../models/data-processing";
import { testStatuses } from "../../models/status/status";
import UploadSection from "./UploadSection";
const { Title, Paragraph } = Typography;

const visaType = {
  tourist: "Туристическая",
  student: "Студенческая",
  work: "Рабочая",
}


const DESCRIPTION_FIELDS_VAR_1 = ['Ответственный визовик','ID заявителя', 'Login', 'Password', 'E-mail', 'Tel', ]
const DESCRIPTION_FIELDS_VAR_2 = ['Name','Surname','ИНН', 'Gender', "Datebirth",]
const DESCRIPTION_FIELDS_VAR_3 = [ 'Паспорт', 'Дата выдачи', 'Окончание действия', 'Кем выдан', "Факт. домашний адрес", 'Юр. домашний адрес', 'Семейный статус', 'Страна гражданства', 'Страна рождения', 'Город рождения', ]

const makeDescriptionList = (obj, descriptionFields) => {
  // TODO: Данную проверку удалить перед релизом.
  if (obj === undefined) {
    return descriptionFields.map(key => {
      return <Descriptions.Item label={key}>-</Descriptions.Item>
    })
  }
  
  return descriptionFields.map(key => {
    if(key === "Ответственный визовик" ){
      return <Descriptions.Item label={key} span={2} labelStyle={{color:"rgb(75, 216, 86)"}}>{obj.viser}</Descriptions.Item>
    }
    return <Descriptions.Item label={key}>{obj[key]}</Descriptions.Item>
  })
}

const ApplicationForm = ({user}) => {
  const {appId} = useParams();
  // из state.countryFlag берем путь к флагу страны.
  // из state.countryNameRu берем русское название страны.
  const {state} = useLocation() ;
  console.log(state.countryFlag)
  const APPLICATION_REF = getAppRefById(appId);
  const [curApplicationDocSnapshot, curAppDocSnapLoading, curAppDocSnapError] = useDocument(APPLICATION_REF);
  // const [docsFile, setDocsFile] = useState(null);
  // const [applicationFile, setApplicationFile] = useState(null);
 
 
  
  if ( curAppDocSnapLoading ) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
  }
  
  const appDoc = getAllFieldsFromDocSnapshot(curApplicationDocSnapshot)
  const cardTitle = `${state.countryNameRu}-${visaType[appDoc.type]}`
  const curAppStatus = appDoc.preparedInformation.preparationStatus;
  console.log(typeof curAppStatus)

  return (
    <Layout style={{height:"calc(100vh - 64px)", padding:"0px 10px 10px"}}>
      <Row gutter={20} style={{height:"100% "}}>
        <Col span={12} style={{height:"100%", overflowY:"auto"}}>
          <CardComponent 
            countryFlag = {state.countryFlag}
            cardTitle={cardTitle}
            curAppStatus={curAppStatus}
            appDocId={appDoc.documentID}
            assignedTo={appDoc.preparedInformation.assignedTo}
            appRef={APPLICATION_REF}
          />
          <Typography >
            <Title level={4} style={{textAlign:"center"}} type="success">
              Заявка {appId}
            </Title>
          </Typography>
          {/* <Descriptions labelStyle={{width:"150px", textAlign:"center", fontWeight:"700", padding:"5px", }} size="small" bordered column={2} title="Personal info" >
            {makeDescriptionList(docVar1, DESCRIPTION_FIELDS_VAR_1)}
          </Descriptions> 
          <Divider></Divider>
          <Descriptions contentStyle={{alignItems:"center"}}  labelStyle={{width:"100px", textAlign:"center", padding:"5px"}} size="middle" title="Person" column={1} >
            {makeDescriptionList(docVar2, DESCRIPTION_FIELDS_VAR_2)}
          </Descriptions>
          <Divider></Divider>
          <Descriptions column={1}  labelStyle={{width:"150px", padding:"5px", textAlign:"center"}} title="Passport & Adress" bordered>
            {makeDescriptionList(docVar3, DESCRIPTION_FIELDS_VAR_3)}
          </Descriptions>
          <Divider></Divider> */}
        </Col>
        <Col  span={12} style={{height:"100%", overflowY:"auto", borderLeft:"1px solid #0000002c"}}>
          <Chat appId={appId} user={user}/>
          <UploadSection appId={appId} uploadedDocs={appDoc.preparedInformation.documents}/>
        </Col>
      </Row>
    </Layout>  
  )
}

export default ApplicationForm;
