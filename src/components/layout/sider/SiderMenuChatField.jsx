import { Badge } from 'antd';
import React, { useContext } from 'react';
import { ProgramContext, WorkPageContext } from '../../../models/context';

const SiderMenuChatField = ({unreadMessagesCount}) => {
  const {unreadMessagesArray} = useContext(WorkPageContext);
  const {role} = useContext(ProgramContext);

  const unreadCount = unreadMessagesCount || unreadMessagesArray?.length;

  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems:'center'}}>
        <p>Чат</p>
        <Badge
          count={unreadCount}
          styles={
            {
              root:{color: "white"},
              indicator: {boxShadow:'none', backgroundColor:"#56DA27"}
            }
          }
        />
      </div>
    </div>
  )
};

export default SiderMenuChatField;
