import React, { useContext, useState, useRef, useEffect } from "react";
import { useCollection, useDocumentData, useCollectionData } from "react-firebase-hooks/firestore"
import { useLocation, useParams } from "react-router-dom";
import { Layout, Row, Col, Spin } from "antd";
import Chat from "../../../modules/Chat/components/Chat";
import Error from "../../../components/error/Error";
import getAllCountriesRef from "../../../firebase/countries/getAllCountriesRef";
import { getChatQuery } from "../../../firebase/chat/getChatQuery";
import { getDialogueSnap } from "../../../models/chat/chat-data-processing";
import getAllClientApplications from "../firebase/getAllClientApplications";
import { paymentTypes } from "../../../models/applications/applications";
import { ApplicationStatus, ProgramContext, WorkPageContext } from "../../../models/context";
import PaymentType from "../../../components/application/PaymentType";
import '../../../assets/application-work-area.scss';
import { getDocFromCollectionByFieldAndValue } from "../../../helpers/getDocFromCollectionByFieldAndValue";
import ApplicationToolBar from "../../../modules/ApplicationToolBar/components/ApplicationToolBar";
import ApplicantsPassports from "../../../modules/ApplicantPassports/components/ApplicantsPassports";
import ApplicationQuestionnaires from "../../../modules/ApplicationQuestionnaires/components/ApplicationQuestionnaires";
import { getAllFieldsFromDocSnapshot } from "../../../helpers/getAllFieldsFromDocSnapshot";
import Documents from "../../../modules/Documents/components/Documents";
import updateDocField  from "../../../firebase/updateDocField";

const visaType = {
  tourist: "Туристическая",
  student: "Студенческая",
  work: "Рабочая",
}

const ApplicationWorkArea = ({ clientId }) => {
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

  useEffect(() => {
    // если форма открыта не из чата - получить dialogue и сохранить в ref для дальнейшего удобства.
    if (!dialogueForApplication?.current && chatsCollSnapshot && allClientAppsCollSnapshot && curApplicationSnap) {
      const dialogue = getDialogueSnap(chatsCollSnapshot, getAllFieldsFromDocSnapshot(curApplicationSnap).UID).data();
      dialogueForApplication.current = dialogue;
      setSelectedDialogue({dialogue: dialogue})
    }
  }, [chatsCollSnapshot, curApplicationSnap, dialogueForApplication, allClientAppsCollSnapshot, setSelectedDialogue] )

  useEffect(() => {
    if(state?.savedCountry) setCountry(state?.savedCountry);
  },[state?.savedCountry]);

  useEffect(() => {
    if(allClientAppsCollSnapshot) {
      setCurApplicationSnap(getDocFromCollectionByFieldAndValue(allClientAppsCollSnapshot, 'documentID', appId));
    }
  }, [allClientAppsCollSnapshot, appId])

  useEffect(() => {
    if (!state?.savedCountry && !country && curApplicationSnap && countriesData) {
      setCountry(countriesData.countries.find(country => country.country_code === curApplicationSnap.get('country_code')))
    }
  }, [countriesData, curApplicationSnap, country, state?.savedCountry])

  useEffect(() => {
    if(curApplicationSnap && role === 'operator' && !curApplicationSnap.get('isRead')) {
      const viewApplication = async (ref) => {
        await updateDocField(ref, 'isRead', true);
      }
      viewApplication(curApplicationSnap.ref);
    }
  })

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
  const curApplication = getAllFieldsFromDocSnapshot(curApplicationSnap);
  const countryNameRu = country.name_ru;
  const countryFlag = country.flag;
  const cardTitle = `${countryNameRu}-${visaType[curApplication.type]}`
  const curAppStatus = curApplication.preparedInformation.preparationStatus;
  const dialogueSnap = getDialogueSnap(chatsCollSnapshot, curApplication.UID);
  console.log(allClientAppsCollSnapshot.docs.map(doc => doc.data()))

  return (
    <ApplicationStatus.Provider value={{curAppStatus: curAppStatus}}>
      <Layout ref={applicationFormRef} style={{height:"calc(100vh - 64px)", padding:"0px 10px 10px"}}>
        <Row gutter={20} style={{height:"100% "}}>
          <Col span={12} style={{height:"100%", overflowY:"auto"}}>
            <ApplicationToolBar
              countryFlag={countryFlag}
              cardTitle={cardTitle}
              appDocId={curApplication.documentID}
              assignedTo={curApplication.preparedInformation.assignedTo}
              appRef={curApplicationSnap.ref}
              dialogueSnap={dialogueSnap}
              currentClientApplications={allClientAppsCollSnapshot.docs}
            />
            <PaymentType paymentType={paymentTypes[curApplication.paymentType]}/>
            <div style={{ color:"#0F6CA5"}}>
              <ApplicantsPassports passports={curApplication.passports} appId={appId} appRef={curApplicationSnap.ref}/>
              <ApplicationQuestionnaires questionnaire={curApplication.questionnary?.answers} appRef={curApplicationSnap.ref}/>
            </div>
          </Col>
          <Col span={12} style={{height:"100%", overflowY:"auto"}}>
            <div className="chat-section">
              <Chat
                clientApplicationsSnaps={allClientAppsCollSnapshot.docs}
                applicantId={curApplication.UID} source="application"
              />
            </div>
            <Documents uploadedDocs={curApplication.preparedInformation.documents}/>
          </Col>
        </Row>
      </Layout>
    </ApplicationStatus.Provider>
  )
}

export default ApplicationWorkArea;
