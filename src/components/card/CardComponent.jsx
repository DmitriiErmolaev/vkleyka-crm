import React, {useState, useEffect, useContext} from 'react';
import {Card, Progress, Layout} from 'antd';
import SelectComponent from '../selectors/SelectComponent';
import { testStatuses } from '../../models/status/status';
import CardTitle from './CardTitle';
import ApplicationInfoCardFooter from './ApplicationInfoCardFooter';
import { getFileRef } from '../../models/firebase';
import { getFileUrl } from '../../models/applications/applications';
import { ApplicationStatus } from '../../models/context';
import { getDownloadURL } from 'firebase/storage';
import Spinner from '../spinner/Spinner';

const CardComponent = ({countryFlag, cardTitle, appDocId, assignedTo, appRef, dialogueSnap, currentClientApplications, questionnaire}) => {
  const [progressPercent, setProgressPercent] = useState();
  const [progressColor, setProgressColor] = useState();
  const [flagUrl, setFlagUrl] = useState(null)
  const {curAppStatus} = useContext(ApplicationStatus); // если рендерится из ApplicationForm - получает статус заявки.

  const flagRef = getFileRef(countryFlag);

  useEffect(() => {
    if(countryFlag) {
      const func = async () => {
        const url = await getDownloadURL(flagRef);
        setFlagUrl(url)
      }
      func()
    }
  }, [])

  // useEffect(() => {
  //   // TODO: сделать загрузку флага до отображения всей карты. 
  //   getFileUrl(flagRef).then(res => {
  //     setFlagUrl(res)
  //   })
  // },[])

  useEffect(() => {
    if(curAppStatus || curAppStatus === 0) {
      setProgressPercent(testStatuses[curAppStatus].progressPercent);
      setProgressColor(testStatuses[curAppStatus].progressBarColor);
    }
  },[curAppStatus])

 

  return (
    <Layout style={{marginBottom:"10px"}}>
      <Card
        headStyle={{padding:"42px 27px 0", backgroundColor:"#182A67", font:"500 20px Jost, sans-serif", color:"#fff", borderRadius:"0"}}
        bodyStyle={{padding:"44px 27px 22px", backgroundColor:"#182A67", borderRadius:"0"}}
        title={<CardTitle cardTitle={cardTitle} flagUrl={flagUrl}/>}
        // extra={<QuestionnaireFillPercentage />} 
      >
        <Progress 
          percent = {progressPercent}
          strokeLinecap = "square"
          size = {["418px", 41]} // ширина и высота. Ширина складывается из фактической ширина прогресс бара и зарезервированного паддинга под ::after.
          strokeColor = {progressColor}
          trailColor = "#fff"
          style={{
            marginBottom:"25px", 
            position:"relative", // позиционируем, чтобы спан прогресс бара, в котором рендерится селектор позиционировался относительно начальных координат прогресс бара
          }}
          format = {() => <SelectComponent data={{ appDocId, currentClientApplications, dialogueSnap, assignedTo}} collectionType="statuses"/>}
        />
        <ApplicationInfoCardFooter appRef={appRef} assignedTo={assignedTo} dialogueSnap={dialogueSnap} currentClientApplications={currentClientApplications}/>
      </Card>
    </Layout>
  );
};

export default CardComponent; 
