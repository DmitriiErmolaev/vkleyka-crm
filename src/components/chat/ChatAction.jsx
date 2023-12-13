import React, {useContext} from 'react';
import { Button } from 'antd';
import SelectComponent from '../selectors/SelectComponent';
import { updateDocField } from '../../models/data-processing';
import { ProgramContext } from '../../models/context';

const ChatAction = ({dialogue, dialogueSnap, clientApplicationsSnaps=[]}) => {
  const {authorizedUser, role} = useContext(ProgramContext);

  const assignToMe = async (e) => {
    e.stopPropagation();
    try {
      if(clientApplicationsSnaps.length > 0) {
        for (const applicationSnap of clientApplicationsSnaps) {
          await updateDocField(applicationSnap.ref, "preparedInformation.assignedTo", authorizedUser.id);
        }
      }
      await updateDocField(dialogueSnap.ref, "assignedTo", authorizedUser.id);
    } catch (e) {
      console.log(e)
    }
  }

  return role === 'admin' ? (
    <SelectComponent
      collectionType={"operators"}
      data={{
        clientApplicationsSnaps,
        dialogueSnap,
        assignedTo: dialogue.assignedTo,
        transparent: false
      }}
    />
  ) : (
    dialogue.assignedTo ? (
      <SelectComponent
        collectionType={"operators"}
        data={{
          clientApplicationsSnaps,
          dialogueSnap,
          assignedTo:dialogue.assignedTo,
          transparent:false
        }}
      />
    ) : (
      <Button
        type={"primary"}
        onClick={assignToMe}
      >
        Взять
      </Button>
    )
  )
};

export default ChatAction;
