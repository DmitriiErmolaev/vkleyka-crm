import React, { useContext, useState, useRef, useEffect } from "react";
import { useDocument, useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import { useLocation, useParams } from "react-router-dom";
import { Layout, Row, Col, Spin } from "antd";
import Chat from "../chat/Chat";
import CardComponent from "../card/CardComponent";
import { getAllFieldsFromDocSnapshot } from "../../models/data-processing";
import UploadSection from "./UploadSection";
import QuestionnaireSection from "../questionnaire/QuestionnaireSection";
import Error from "../error/Error";
import { getFullCountryName } from "../../models/applications/table-data-processing";
import { getCountry, getCountryFlag } from "../../models/countries/countries";
import { getAllCountriesRef } from "../../models/countries/countries";
import { getSingleFieldFromDocSnapshot } from "../../models/data-processing";
import { getChatQuery } from "../../models/chat/chat-data-processing";
import { getDialogueSnap } from "../../models/chat/chat-data-processing";
import { getAllClientApplications } from "../../models/applications/applications";
import { ApplicationStatus, ProgramContext } from "../../models/context";
import '../../assets/application-form.scss';

const visaType = {
  tourist: "Туристическая",
  student: "Студенческая",
  work: "Рабочая",
}

const ApplicationForm = ({ clientId }) => {
  const { appId } = useParams();
  const applicationFormRef = useRef(null);
  const { state } = useLocation();
  const { authorizedUser, role } = useContext(ProgramContext);
  const [ countriesData, countriesLoading, countriesError, countriesDocSnapshot ] = useDocumentData(getAllCountriesRef(state?.country));
  const [ allClientAppsCollSnapshot, allClientAppsCollSnapshotLoading, allClientAppsCollSnapshotError ] = useCollection(getAllClientApplications(clientId, authorizedUser.id, role));
  const [ chatsCollSnapshot, chatsLoading, chatsError ] = useCollection(getChatQuery());

  if ( countriesLoading || chatsLoading || allClientAppsCollSnapshotLoading) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
  }

  if(allClientAppsCollSnapshotError || countriesError || chatsError ) {
    return <Error error={allClientAppsCollSnapshotError || countriesError || chatsError }/>
  }
  
  const currentClientApplications = allClientAppsCollSnapshot.docs;
  const curApplicationSnap = allClientAppsCollSnapshot.docs.find(docSnap => docSnap.id === appId);
  const application = getAllFieldsFromDocSnapshot(curApplicationSnap)
  const country = state?.country ? state.country : getCountry(countriesData.countries, application.country_code);
  const countryNameRu = state?.country ? state.country.name_ru : country.name_ru;
  const countryFlag = state?.country ? state.country.flag : country.flag;
  const cardTitle = `${countryNameRu}-${visaType[application.type]}`
  const curAppStatus = application.preparedInformation.preparationStatus;
  const applicantName = `${application.passports[0].first_name} ${application.passports[0].last_name}`
  const dialogueSnap = getDialogueSnap(chatsCollSnapshot, application.UID)

  return (
    <ApplicationStatus.Provider  value={{curAppStatus: curAppStatus}}>
      <Layout ref={applicationFormRef} style={{height:"calc(100vh - 64px)", padding:"0px 10px 10px"}}>
        <Row gutter={20} style={{height:"100% "}}>
          <Col span={12} style={{height:"100%", overflowY:"auto"}}>
            <CardComponent
              countryFlag={countryFlag}
              cardTitle={cardTitle}
              appDocId={application.documentID}
              assignedTo={application.preparedInformation.assignedTo}
              appRef={curApplicationSnap.ref}
              dialogueSnap={dialogueSnap}
              currentClientApplications={currentClientApplications}
              questionnaire={application.questionnary?.answers}
            />
            <QuestionnaireSection
              questionnaire={application.questionnary?.answers}
              passports={application.passports}
              appRef={curApplicationSnap.ref}
              appId={appId}
            />
          </Col>
          <Col  span={12} style={{height:"100%", overflowY:"auto"}}>
            <div className="chat-section">
              <Chat applicantName={applicantName} clientApplicationsSnaps={currentClientApplications} applicantId={application.UID} source="application"/>
            </div>
            <UploadSection uploadedDocs={application.preparedInformation.documents}/>
          </Col>
        </Row>
      </Layout>
    </ApplicationStatus.Provider>
  )
}

export default ApplicationForm;
