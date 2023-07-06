import React, {useState, useEffect, useContext} from 'react';
import {Card, Progress, Typography, Layout} from 'antd';
import SelectComponent from '../selectors/SelectComponent';
import { testStatuses } from '../../models/status/status';
import { UserContext } from '../../models/context';
import { roleBasedContent } from '../../models/role-based-rules';

const {Title} = Typography;

const CardComponent = ({cardTitle, curAppStatus, appDocId, assignedTo, appRef}) => {
  const [progressPercent, setProgressPercent] = useState();
  const [progressColor, setProgressColor] = useState();
  const {role} = useContext(UserContext)

  useEffect(() => {
    if(curAppStatus) {
      setProgressPercent(testStatuses[curAppStatus].progressPercent);
      setProgressColor(testStatuses[curAppStatus].progressBarColor);
    }
  })

  return (
    <Card
      headStyle={{padding:"42px 27px 0",backgroundColor:"#182A67",font:"500 20px Jost, sans-serif", color:"#fff", borderRadius:"0"}}
      bodyStyle={{padding:"44px 27px 22px", backgroundColor:"#182A67",borderRadius:"0"}}
      size="small"
      title={cardTitle}
    >
      <Progress 
        percent = {progressPercent}
        strokeLinecap = "square"
        size = {["418px",41]} // ширина и высота. Ширина складывается из фактической ширина прогресс бара и зарезервированного паддинга под ::after.
        strokeColor = {progressColor}
        trailColor = "#fff"
        style={{marginBottom:"25px"}}
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
  );
};

export default CardComponent; 