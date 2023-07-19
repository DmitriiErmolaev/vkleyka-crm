import React, {useState, useEffect, useContext} from 'react';
import {Card, Progress, Typography, Layout} from 'antd';
import SelectComponent from '../selectors/SelectComponent';
import { testStatuses } from '../../models/status/status';
import { UserContext } from '../../models/context';
import { roleBasedContent } from '../../models/role-based-rules';
import CardTitle from './CardTitle';
import { getFileRef } from '../../models/firebase';
import { getFileUrl } from '../../models/applications/applications';

const {Title} = Typography;

const CardComponent = ({countryFlag, cardTitle, curAppStatus, appDocId, assignedTo, appRef}) => {
  console.log(countryFlag)
  const [progressPercent, setProgressPercent] = useState();
  const [progressColor, setProgressColor] = useState();
  const {role} = useContext(UserContext)
  const [flagUrl, setFlagUrl] = useState(null)


  useEffect(() => {
    getFileUrl(flagRef).then(res => {
      console.log(res)
      setFlagUrl(res)
    })
  },[])

  useEffect(() => {
    if(curAppStatus || curAppStatus === 0) {
      setProgressPercent(testStatuses[curAppStatus].progressPercent);
      setProgressColor(testStatuses[curAppStatus].progressBarColor);
    }
  })

  if (flagUrl === null) {
    // TODO: показать скелетон или спиннер на всей карте.
  }

  const flagRef = getFileRef(countryFlag);


  return (
    <Layout style={{marginBottom:"10px"}}>
      <Card
        headStyle={{padding:"42px 27px 0",backgroundColor:"#182A67",font:"500 20px Jost, sans-serif", color:"#fff", borderRadius:"0"}}
        bodyStyle={{padding:"44px 27px 22px", backgroundColor:"#182A67",borderRadius:"0"}}
        // size="small"
        title={<CardTitle data={{cardTitle: cardTitle, flagUrl: flagUrl}}/>}
      >
        <Progress 
          percent = {progressPercent}
          strokeLinecap = "square"
          size = {["418px",41]} // ширина и высота. Ширина складывается из фактической ширина прогресс бара и зарезервированного паддинга под ::after.
          strokeColor = {progressColor}
          trailColor = "#fff"
          style={{
            marginBottom:"25px", 
            position:"relative" // позиционируем, чтобы спан прогресс бара, в котором рендерится селектор позиционировался относительно начальных координат прогресс бара
          }}
          format = {() => <SelectComponent data={{curAppStatus, appDocId:appDocId}} collectionType="statuses"/>}
        />
        <Layout style={{backgroundColor:"inherit", display:roleBasedContent[role].cardOperatorAssigmentDisplayProperty}}>
          <Typography >
            <Title style={{color:"#fff"}} level={4}>
              Отв-ный
            </Title>
          </Typography>
          <SelectComponent data={{ref:appRef, assignedTo:assignedTo}} collectionType="operators"/>
        </Layout>
      </Card>
    </Layout>
  );
};

export default CardComponent; 