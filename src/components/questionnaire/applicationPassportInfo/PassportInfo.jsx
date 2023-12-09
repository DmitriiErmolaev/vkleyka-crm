import React, {useState, useContext } from 'react';
import { Collapse, Image, Layout } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import Question from '../Question';
import PassportInfoCollapseItemLabel from './label/PassportInfoCollapseItemLabel';
import ApplyOrCancel from '../ApplyOrCancel';
import { getPassportInfoCollapseItem } from '../../../models/applications/questionnaire/questionnaire';
import { ApplicationStatus, PassportInfoContext } from '../../../models/context';
import { getDownloadURL }from 'firebase/storage';
import '../../../assets/passport-info.scss'
import { getFileRef, getRootStorageRef } from '../../../models/firebase';
import dayjs from 'dayjs';
import ApplicantPassportTitle from './content/ApplicantPassportTitle';
import ApplicantPassportFields from './content/ApplicantPassportFields';
import PassportInfoCollapseItemChildren from './content/PassportInfoCollapseItemChildren';

const PassportInfo = ({passports, appId, appRef}) => {
  const {curAppStatus} = useContext(ApplicationStatus);
  const [passportInfoIsEdit, setPassportInfoIsEdit] = useState(false);

  // Collapse будет состоять из 1 элемента. По этому только 1 лейбл.
  const collapseItemLabel = <PassportInfoCollapseItemLabel appId={appId} passportsLength={passports.length} />
  // Collapse будет состоять из 1 элемента. По этому только 1 массив children в котором 1 или несколько заявителей со своими title и fields.
  const collapseItemChildren = <PassportInfoCollapseItemChildren passports={passports} />

  const passportsInfoLabelExtra = curAppStatus !== 2 ? (
    <EditOutlined
      className="interactive-icons"
      style={{ fontSize: '22px', color: '#08c', marginLeft:"10px"}}
      onClick={() =>  setPassportInfoIsEdit(true)}
    />
  ) : (
    null
  )

  const collapseItems = getPassportInfoCollapseItem(collapseItemLabel, passportsInfoLabelExtra, collapseItemChildren) // массив элементов. Представлен 1 элементом. Паспортная часть.

  return (
    <PassportInfoContext.Provider value={{isEdit: passportInfoIsEdit, setIsEdit: setPassportInfoIsEdit, appRef}}>
      <div style={{marginBottom:"10px"}}>
        <Collapse
          bordered={false}
          items={collapseItems}
          size={"middle"}
          defaultActiveKey={"personalInfo"}
          expandIcon={()=>{}} // убирает иконку стрелки, из-за чего некуда кликать, чтобы свернуть.
          collapsible="icon" // разрешаем коллапс по клику на иконку, получается что коллапс запрещен, т.к. иконки нет.
        />
      </div>
    </PassportInfoContext.Provider>
  );
};

export default PassportInfo;
