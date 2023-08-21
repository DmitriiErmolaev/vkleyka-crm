import React from 'react';
import { Card, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../../assets/chat/dialog-list-item.scss'
import DialogueListItemTitle from './DialogueListItemTitle';
import { getlastMessageTime } from '../../models/chat/dialogue-list/dialogue-list-item-title';
const {Meta} = Card;

const DialogueListItem = ({user, dialogue, setSelectedDialogue, setDialogueWindowOpen, unreadMessagesNumber}) => {
  const handleDialogSelect = () => {
    setSelectedDialogue({dialogue, unreadMessagesNumber});
    setDialogueWindowOpen(true);
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

  const messageCreationTime = !dialogue.messages.length
      ? ''
      : getlastMessageTime(dialogue.messages[dialogue.messages.length - 1].time)
  

  return (
    <Card.Grid
      style={{width:"100%", padding:"14px 7px 14px 20px"}}
    >
      <div className="dialogue-card" onClick={handleDialogSelect}>
        <Meta
          style={{backgroundColor:"transparent",border:"none", alignItems:"center",}}
          avatar={
            <Avatar 
              shape="sircle" 
              icon={<UserOutlined />} 
              alt="avatar" 
              size={50}
            />
          }
          title={
            <DialogueListItemTitle 
              applicantName={applicantName} 
              unreadMessagesNumber={unreadMessagesNumber} 
              messageCreationTime={messageCreationTime}
            />
          }
          description={<div className="dialogue-list__last-message">{lastMessage}</div>}
        />
      </div>
    </Card.Grid>
  );
};

export default DialogueListItem;
