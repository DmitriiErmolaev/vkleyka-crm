import React, { useRef, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useCollection } from 'react-firebase-hooks/firestore';
import '../../assets/chat/dialog-list-item.scss'
import DialogueListItemTitle from './DialogueListItemTitle';
import DialogueListItemFooter from './DialogueListItemFooter';
import { getlastMessageTime } from '../../models/chat/dialogue-list/dialogue-list-item-title';
import { ProgramContext, WorkPageContext } from '../../models/context';
const {Meta} = Card;

const DialogueListItem = ({client, dialogue, dialogueSnap, selectedDialogue, functions, clientApplicationsSnaps, unreadMessagesNumber}) => {
  // const [ itemGridClassName, setItemGridClassName ] = useState('dialogue-card')
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { dialogueForApplication } = useContext(WorkPageContext);


  const handleDialogSelect = () => {
    if (selectedDialogue?.dialogue.UID === dialogue.UID) {
      return false
    }

    functions.setSelectedDialogue({dialogue, clientApplicationsSnaps});

    if(clientApplicationsSnaps.length > 0) {
      dialogueForApplication.current = dialogue;
      if (clientId !== clientApplicationsSnaps[0].get('UID')) {
        navigate(`/application/${clientApplicationsSnaps[0].get('UID')}/${clientApplicationsSnaps[0].get('documentID')}`, {state: {dialogue: dialogue}});
      }
      functions.handleDrawerClose();
    } else {
      functions.setDialogueWindowOpen(true);
    }
  }

  // у клиента имени может не быть. Вывести айди если его нет.
  const applicantName = client?.name
    ? client.name
    : (
      client?.passports[0]?.first_name
          ? `${client.passports[0].first_name} ${client.passports[0].last_name}`
          : client?.UID
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

  const cardIsSelected = dialogue.UID === selectedDialogue?.dialogue.UID;
  return (
    <Card.Grid
      className={cardIsSelected ? "dialogue-card dialogue-card_selected" : "dialogue-card"}
      style={{width:"100%", padding:"14px 7px 14px 20px"}}
    >
      <div className="dialogue-card__container" onClick={handleDialogSelect}>
        <div className="dialogue-card__content">
          <Meta
            style={{backgroundColor:"transparent",border:"none", alignItems:"center",marginBottom:"15px"}}
            avatar={
              <Avatar
                shape="circle"
                icon={<UserOutlined />}
                alt="avatar"
                size={50}
              />
            }
            title={
              <DialogueListItemTitle
                applicantName={applicantName || <i style={{color:'#8A8A8A', fontWeight:'400'}}>Аккаунт удален</i>} // TODO: временное решение. Ждем изменений от Жангира
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
