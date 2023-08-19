import React, {useState, useEffect, useContext} from 'react';
import {Card, Progress, Typography, Layout} from 'antd';
import SelectComponent from '../selectors/SelectComponent';
import { testStatuses } from '../../models/status/status';
import { ProgramContext } from '../../models/context';
import { roleBasedContent } from '../../models/role-based-rules';
import CardTitle from './CardTitle';
import { getFileRef } from '../../models/firebase';
import { getFileUrl } from '../../models/applications/applications';

const {Title} = Typography;

const CardComponent = ({countryFlag, cardTitle, curAppStatus, appDocId, assignedTo, appRef, dialogueRef}) => {
  const [progressPercent, setProgressPercent] = useState();
  const [progressColor, setProgressColor] = useState();
  const {role} = useContext(ProgramContext)
  const [flagUrl, setFlagUrl] = useState(null)
  const flagRef = getFileRef(countryFlag);

  useEffect(() => {
    // TODO: сделать загрузку флага до отображения всей карты. 
    getFileUrl(flagRef).then(res => {
      setFlagUrl(res)
    })
  },[])

  useEffect(() => {
    if(curAppStatus || curAppStatus === 0) {
      setProgressPercent(testStatuses[curAppStatus].progressPercent);
      setProgressColor(testStatuses[curAppStatus].progressBarColor);
    }
  },[curAppStatus])

  if (flagUrl === null) {
    // TODO: показать скелетон или спиннер на всей карте.
  }

  return (
    <Layout style={{marginBottom:"10px"}}>
      <Card
        headStyle={{padding:"42px 27px 0", backgroundColor:"#182A67", font:"500 20px Jost, sans-serif", color:"#fff", borderRadius:"0"}}
        bodyStyle={{padding:"44px 27px 22px", backgroundColor:"#182A67", borderRadius:"0"}}
        title={<CardTitle data={{cardTitle: cardTitle, flagUrl: flagUrl}}/>}
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
          format = {() => <SelectComponent data={{curAppStatus, appDocId:appDocId}} collectionType="statuses"/>}
        />
        {/*TODO: Рефакторить отдельным компонентом который принимает параметр и в результате рнедерит или нет */}
        <Layout style={{backgroundColor:"inherit", display:roleBasedContent[role].cardOperatorAssigmentDisplayProperty}}>
          <Typography >
            <Title style={{color:"#fff"}} level={4}>
              Отв-ный
            </Title>
          </Typography>
          <SelectComponent data={{ref:appRef, assignedTo, dialogueRef,  transparent: false}} collectionType="operators"/>
        </Layout>
      </Card>
    </Layout>
  );
};

export default CardComponent; 
