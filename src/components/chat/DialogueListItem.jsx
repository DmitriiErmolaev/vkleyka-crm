import React from 'react';
import { Card, Avatar } from 'antd';
const {Meta} = Card;

const DialogueListItem = ({user, dialogue, setSelectedDialogApplicantId, setDialogWindowOpen}) => {

  const handleDialogSelect = () => {
    setSelectedDialogApplicantId(user.UID);
    setDialogWindowOpen(true);
  }
  
  // у клиента имени может не быть. Вывести айди если его нет.
  const applicantName = user.name 
    ? user.name 
    : (
        user.passports[0]?.first_name 
          ? `${user.passports[0].first_name} ${user.passports[0].last_name}`
          : user.UID
      )

  return (
    <li onClick={handleDialogSelect}>
      <Card 
        bodyStyle={{borderRadius:"0", padding:"10px 0"}}
        bordered={false}
      >
        <Meta
          style={{alignItems:"center"}}
          avatar={<Avatar shape="sircle" alt="avatar" src="" size="large"/>}
          title={applicantName}
          description={dialogue.messages[dialogue.messages.length - 1].content}
        />
      </Card>
    </li>
    
  );
};

export default DialogueListItem;