import React, { useContext, useState, useRef, useEffect } from "react";
import { useDocument, useCollection, useDocumentData, useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore"
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
import { ApplicationStatus, ProgramContext, WorkPageContext } from "../../models/context";
import '../../assets/application-form.scss';
import ChatContainer from "../chat/ChatContainer";

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
  const { dialogueForApplication, setSelectedDialogue } = useContext(WorkPageContext);
  const [ countriesData, countriesLoading, countriesError, countriesDocSnapshot ] = useDocumentData(getAllCountriesRef(state?.savedCountry));
  const [ allClientAppsData, allClientAppsCollSnapshotLoading, allClientAppsCollSnapshotError, allClientAppsCollSnapshot ] = useCollectionData(getAllClientApplications(clientId, authorizedUser.id, role));
  const [ chatsCollSnapshot, chatsLoading, chatsError ] = useCollection(getChatQuery());
  const [ country, setCountry ] = useState();
  const [ curApplicationSnap, setCurApplicationSnap ] = useState();
  console.log(allClientAppsData)
  useEffect(() => {
    // если форма открыта не из чата - получить dialogue и сохранить в ref для дальнейшего удобства.
    if (!dialogueForApplication?.current && chatsCollSnapshot && allClientAppsCollSnapshot && curApplicationSnap) {
      const dialogue = getDialogueSnap(chatsCollSnapshot, curApplicationSnap.data().UID).data();
      dialogueForApplication.current = dialogue;
      setSelectedDialogue({dialogue: dialogue})
    }
  }, [chatsCollSnapshot, curApplicationSnap, dialogueForApplication, allClientAppsCollSnapshot, setSelectedDialogue] )

  useEffect(() => {
    if(state?.savedCountry) setCountry(state?.savedCountry);
  },[state?.savedCountry]);

  useEffect(() => {
    if(allClientAppsCollSnapshot) {
      setCurApplicationSnap(allClientAppsCollSnapshot.docs.find(appDoc => appDoc.get('documentID') === appId));
    }
  }, [allClientAppsCollSnapshot, appId])

  useEffect(() => {
    if (!state?.savedCountry && !country && curApplicationSnap && countriesData) {
      setCountry(countriesData.countries.find(country => country.country_code === curApplicationSnap.get('country_code')))
    }
  }, [countriesData, curApplicationSnap, country, state?.savedCountry])

  if (!country || !curApplicationSnap || chatsLoading) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
  }

  if(allClientAppsCollSnapshotError || countriesError || chatsError ) {
    return <Error error={allClientAppsCollSnapshotError || countriesError || chatsError }/>
  }

  const curApplication = curApplicationSnap.data();
  const countryNameRu = country.name_ru;
  const countryFlag = country.flag;
  const cardTitle = `${countryNameRu}-${visaType[curApplication.type]}`
  const curAppStatus = curApplication.preparedInformation.preparationStatus;
  const dialogueSnap = getDialogueSnap(chatsCollSnapshot, curApplication.UID);

  return (
    <ApplicationStatus.Provider value={{curAppStatus: curAppStatus}}>
      <Layout ref={applicationFormRef} style={{height:"calc(100vh - 64px)", padding:"0px 10px 10px"}}>
        <Row gutter={20} style={{height:"100% "}}>
          <Col span={12} style={{height:"100%", overflowY:"auto"}}>
            <CardComponent
              countryFlag={countryFlag}
              cardTitle={cardTitle}
              appDocId={curApplication.documentID}
              assignedTo={curApplication.preparedInformation.assignedTo}
              appRef={curApplicationSnap.ref}
              dialogueSnap={dialogueSnap}
              currentClientApplications={allClientAppsCollSnapshot.docs}
              questionnaire={curApplication.questionnary?.answers}
            />
            <QuestionnaireSection
              questionnaire={curApplication.questionnary?.answers}
              passports={curApplication.passports}
              appRef={curApplicationSnap.ref}
              appId={appId}
            />
          </Col>
          <Col span={12} style={{height:"100%", overflowY:"auto"}}>
            {/* <ChatContainer applicantId={curApplication.UID}> */}
            <div className="chat-section">
              <Chat 
                clientApplicationsSnaps={allClientAppsCollSnapshot.docs} 
                applicantId={curApplication.UID} source="application"
              />
            </div>
            {/* </ChatContainer> */}
            <UploadSection uploadedDocs={curApplication.preparedInformation.documents}/>
          </Col>
        </Row>
      </Layout>
    </ApplicationStatus.Provider>
  )
}

export default ApplicationForm;
