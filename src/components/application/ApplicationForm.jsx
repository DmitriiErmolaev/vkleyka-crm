import React from "react";
import {useDocument, useCollection} from "react-firebase-hooks/firestore"
import {useParams} from "react-router-dom";
import {Layout, Row, Col, Spin} from "antd";
import Chat from "../chat/Chat";
import CardComponent from "../card/CardComponent";
import { getAppRefById } from "../../models/applications/applications";
import { getAllFieldsFromDocSnapshot } from "../../models/data-processing";
import UploadSection from "./UploadSection";
import QuestionnaireSection from "../questionnaire/QuestionnaireSection";
import Error from "../error/Error";
import { getFullCountryName } from "../../models/applications/table-data-processing";
import { getCountryFlag } from "../../models/countries/countries";
import { getAllCountriesRef } from "../../models/countries/countries";
import { getSingleFieldFromDocSnapshot } from "../../models/data-processing";
import { getChatQuery } from "../../models/chat/chat-data-processing";
import { getDialogueRef } from "../../models/chat/chat-data-processing";
import '../../assets/application-form.scss';

const visaType = {
  tourist: "Туристическая",
  student: "Студенческая",
  work: "Рабочая",
}

const ALL_COUNTRIES_REF = getAllCountriesRef();

const ApplicationForm = () => {
  const {appId} = useParams();
 
  const APPLICATION_REF = getAppRefById(appId);
  const [countriesDocSnapshot, countriesLoading, countriesError] = useDocument(ALL_COUNTRIES_REF);
  const [curApplicationDocSnapshot, curAppDocSnapLoading, curAppDocSnapError] = useDocument(APPLICATION_REF);
  const [chatsCollSnapshot, chatsLoading, chatsError] = useCollection(getChatQuery());
  
  if ( curAppDocSnapLoading || countriesLoading || chatsLoading) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
  }
  
  if(curAppDocSnapError || countriesError || chatsError) {
    return <Error error={curAppDocSnapError || countriesError}/>
  }
  
  const application = getAllFieldsFromDocSnapshot(curApplicationDocSnapshot)
  const countries = getSingleFieldFromDocSnapshot(countriesDocSnapshot, "countries"); // массив объектов-стран#
  const countryNameRu = getFullCountryName(countries, application.country_code) 
  const countryFlag = getCountryFlag(countries, application.country_code)
  const cardTitle = `${countryNameRu}-${visaType[application.type]}`
  const curAppStatus = application.preparedInformation.preparationStatus;
  const applicantName = `${application.passports[0].first_name} ${application.passports[0].last_name}`
  const dialogueRef = getDialogueRef(chatsCollSnapshot, application.UID)

  return (
    <Layout style={{height:"calc(100vh - 64px)", padding:"0px 10px 10px"}}>
      <Row gutter={20} style={{height:"100% "}}>
        <Col span={12} style={{height:"100%", overflowY:"auto"}}>
          <CardComponent 
            countryFlag={countryFlag}
            cardTitle={cardTitle}
            curAppStatus={curAppStatus}
            appDocId={application.documentID}
            assignedTo={application.preparedInformation.assignedTo}
            appRef={APPLICATION_REF}
            dialogueRef={dialogueRef}
          />
          <QuestionnaireSection questionnaire={application.questionnary?.answers} passports={application.passports} appRef={APPLICATION_REF} appId={appId}/>
        </Col>
        <Col  span={12} style={{height:"100%", overflowY:"auto", borderLeft:"1px solid #0000002c"}}>
          <div className="chat-section">
            <Chat applicantName={applicantName} applicantId={application.UID} source="application"/>
          </div>
          <div className="upload-section">
            <UploadSection appId={appId} uploadedDocs={application.preparedInformation.documents}/>
          </div>
        </Col>
      </Row>
    </Layout>  
  )
}

export default ApplicationForm;
