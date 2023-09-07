import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../../assets/chat/dialog-list-item.scss'
import DialogueListItemTitle from './DialogueListItemTitle';
import DialogueListItemFooter from './DialogueListItemFooter';
import { getlastMessageTime } from '../../models/chat/dialogue-list/dialogue-list-item-title';
const {Meta} = Card;

const DialogueListItem = ({user, dialogue, dialogueSnap, functions, clientApplicationsSnaps, unreadMessagesNumber}) => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  // console.log('DialogueListItem')

  const handleDialogSelect = () => {
    if(clientApplicationsSnaps.length > 0) {
      if (clientId !== clientApplicationsSnaps[0].get('UID')) {
        navigate(`/application/${clientApplicationsSnaps[0].get('UID')}/${clientApplicationsSnaps[0].get('documentID')}`);
      }
      functions.handleDrawerClose();
      return
    }

    functions.setSelectedDialogue({dialogue, unreadMessagesNumber, clientApplicationsSnaps});
    functions.setDialogueWindowOpen(true);
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
      className="dialogue-card"
      style={{width:"100%", padding:"14px 7px 14px 20px"}}
    >
      <div className="dialogue-card__container" onClick={handleDialogSelect}>
        <div className="dialogue-card__content">
          <Meta
            style={{backgroundColor:"transparent",border:"none", alignItems:"center",marginBottom:"15px"}}
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
        <DialogueListItemFooter dialogue={dialogue} dialogueSnap={dialogueSnap} clientApplicationsSnaps={clientApplicationsSnaps}/>
      </div>
    </Card.Grid>
  );
};

export default DialogueListItem;
