import React, {useState, useEffect} from "react";
import {collection} from "firebase/firestore"
import {uploadBytes, ref} from "firebase/storage"
import { EditOutlined } from "@ant-design/icons";
import {useDocument} from "react-firebase-hooks/firestore"
import {useParams, useLocation} from "react-router-dom";
import {firestore, storage} from "../../models/firebase"
import {Layout, Button, Divider, Card,  Upload, Typography, Descriptions, Row,Col, Space, Spin, Progress, Select } from "antd";
import Chat from "../chat/Chat";
import SelectComponent from "../selectors/SelectComponent";
import CardComponent from "../card/CardComponent";
import { getAppRefById } from "../../models/applications/applications";
import { getAllFieldsFromDocSnapshot } from "../../models/data-processing";
import { testStatuses } from "../../models/status/status";
import UploadSection from "./UploadSection";
import Questionnaire from "./Questionnaire";
const { Title, Paragraph } = Typography;

const visaType = {
  tourist: "Туристическая",
  student: "Студенческая",
  work: "Рабочая",
}

const ApplicationForm = () => {
  const {appId} = useParams();
  // из state.countryFlag берем путь к флагу страны.
  // из state.countryNameRu берем русское название страны.
  // из state.personalInfo берем объект пользовательских данных заявителя.
  const {state} = useLocation() ;
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
          <Questionnaire questionnaire={appDoc.questionnary.answers} passports={appDoc.passports} appRef={APPLICATION_REF} appId={appId}/>
        </Col>
        <Col  span={12} style={{height:"100%", overflowY:"auto", borderLeft:"1px solid #0000002c"}}>
          <Chat appId={appId} applicantId={appDoc.UID}/>
          <UploadSection appId={appId} uploadedDocs={appDoc.preparedInformation.documents}/>
        </Col>
      </Row>
    </Layout>  
  )
}

export default ApplicationForm;
