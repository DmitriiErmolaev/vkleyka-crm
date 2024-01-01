import React, {useState, useContext } from 'react';
import { Collapse } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { getPassportInfoCollapseItem } from '../helpers/getPassportInfoCollapseItem';
import { ApplicationStatus, PassportInfoContext } from '../../../models/context';
import '../../../assets/applicants-passports.scss';
import PassportInfoCollapseItemLabel from './label/PassportInfoCollapseItemLabel';
import PassportInfoCollapseItemChildren from './content/PassportInfoCollapseItemChildren';


const ApplicantsPassports = ({passports, appId, appRef}) => {
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
      onClick={(e) =>  {
        e.stopPropagation()
        setPassportInfoIsEdit(true)
      }}
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
        />
      </div>
    </PassportInfoContext.Provider>
  );
};

export default ApplicantsPassports;
