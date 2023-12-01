import { Badge } from 'antd';
import React, { useContext } from 'react';
import { ProgramContext, WorkPageContext } from '../../../models/context';

const SiderMenuChatField = () => {
  const {unreadMessagesArray} = useContext(WorkPageContext);
  const {role} = useContext(ProgramContext);

  return (
    <div>
      {role === 'admin' ? (
        <p>Чат</p>
      ) : (
        <div style={{display: "flex", justifyContent: "space-between", alignItems:'center'}}>
          <p >Чат</p>
          <Badge
            count={unreadMessagesArray?.length}
            styles={
              {
                root:{color: "white"},
                indicator: {boxShadow:'none', backgroundColor:"#56DA27"}
              }
            }
          />
        </div>
      )}
    </div>
  )
};

export default SiderMenuChatField;
