import React, {useContext} from 'react';
import ChatAction from './ChatAction';
import ApplicationExistsInfo from './ApplicationExistsInfo';
import { ProgramContext } from '../../models/context';

const DialogueListItemFooter = ({dialogue, dialogueSnap, clientApplicationsSnaps}) => {

  return (
    <div className="dialogue-card__footer">
      <ApplicationExistsInfo clientApplicationsSnaps={clientApplicationsSnaps}/>
      <ChatAction dialogue={dialogue} dialogueSnap={dialogueSnap} clientApplicationsSnaps={clientApplicationsSnaps}/>
    </div>
  );
};

export default DialogueListItemFooter;

