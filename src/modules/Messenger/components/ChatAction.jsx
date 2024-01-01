import React, {useContext} from 'react';
import { Button } from 'antd';
import SelectComponent from '../../../components/selectors/SelectComponent';
import updateDocField  from '../../../firebase/updateDocField';
import { ProgramContext } from '../../../models/context';
import ChangeOperator from '../../../components/application/ChangeOperator';

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
    <ChangeOperator 
      dialogueSnap={dialogueSnap}
      assignedTo={dialogue.assignedTo}
      clientApplicationsSnaps={clientApplicationsSnaps}
      transparent={false}
    />
    // <SelectComponent
    //   collectionType={"operators"}
    //   data={{
    //     clientApplicationsSnaps,
    //     dialogueSnap,
    //     assignedTo: dialogue.assignedTo,
    //     transparent: false
    //   }}
    // />
  ) : (
    dialogue.assignedTo ? (
      <ChangeOperator 
        dialogueSnap={dialogueSnap}
        assignedTo={dialogue.assignedTo}
        clientApplicationsSnaps={clientApplicationsSnaps}
        transparent={false}
      />
      // <SelectComponent
      //   collectionType={"operators"}
      //   data={{
      //     clientApplicationsSnaps,
      //     dialogueSnap,
      //     assignedTo:dialogue.assignedTo,
      //     transparent:false
      //   }}
      // />
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
