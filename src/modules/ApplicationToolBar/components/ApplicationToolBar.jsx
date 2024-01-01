import React, {useState, useEffect, useContext} from 'react';
import { Card, Progress } from 'antd';
import SelectComponent from '../../../components/selectors/SelectComponent';
import { testStatuses } from '../../../helpers/app-status';
import { getFileRef } from '../../../firebase/firebase';
import { ApplicationStatus } from '../../../models/context';
import { getDownloadURL } from 'firebase/storage';
import ToolBarTitle from './ToolBarTitle';
import ToolBarFooter from './ToolBarFooter';

const ApplicationToolBar = ({countryFlag, cardTitle, appDocId, assignedTo, appRef, dialogueSnap, currentClientApplications}) => {
  const [progressPercent, setProgressPercent] = useState();
  const [progressColor, setProgressColor] = useState();
  const [flagUrl, setFlagUrl] = useState(null);
  const {curAppStatus} = useContext(ApplicationStatus);

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

  useEffect(() => {
    if(curAppStatus || curAppStatus === 0) {
      setProgressPercent(testStatuses[curAppStatus].progressPercent);
      setProgressColor(testStatuses[curAppStatus].progressBarColor);
    }
  },[curAppStatus])

  return (
    <div style={{marginBottom:"10px"}}>
      <Card
        headStyle={{padding:"42px 27px 0", backgroundColor:"#182A67", font:"500 20px Jost, sans-serif", color:"#fff", borderRadius:"0"}}
        bodyStyle={{padding:"44px 27px 22px", backgroundColor:"#182A67", borderRadius:"0"}}
        title={<ToolBarTitle cardTitle={cardTitle} flagUrl={flagUrl}/>}
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
        <ToolBarFooter appRef={appRef} assignedTo={assignedTo} dialogueSnap={dialogueSnap} currentClientApplications={currentClientApplications}/>
      </Card>
    </div>
  );
};

export default ApplicationToolBar;
