import React from 'react';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../../assets/chat/dialog-list-item.scss'
const {Meta} = Card;

const DialogueListItem = ({user, dialogue, setSelectedDialog, setDialogWindowOpen}) => {
  const handleDialogSelect = () => {
    setSelectedDialog(dialogue);
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
  const lastMessage = !dialogue.messages.length
    ? ''
    : ( dialogue.messages[dialogue.messages.length - 1].content === ''
      ? <i>attachment</i>
      : dialogue.messages[dialogue.messages.length - 1].content 
    ) 

  return (
    <Card.Grid
      style={{width:"100%", padding:"10px 20px"}}
    >
      <div className="dialogue-card" onClick={handleDialogSelect}>
        <Meta
          style={{backgroundColor:"transparent",border:"none", alignItems:"center",}}
          avatar={<Avatar shape="sircle" icon={<UserOutlined />} alt="avatar" size="large"/>}
          title={applicantName}
          // description={dialogue.messages[dialogue.messages.length - 1]?.content}
          description={lastMessage}
        />
      </div>
    </Card.Grid>
  );
};

export default DialogueListItem;
