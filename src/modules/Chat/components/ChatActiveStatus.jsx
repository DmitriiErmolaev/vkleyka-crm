import React, {useState, useContext} from 'react';
import { Select } from "antd";
import { ProgramContext } from '../../../models/context';
import updateDocField  from '../../../firebase/updateDocField';
import { chatCurrentStatus } from '../helpers/chat-active-status'
import { dialogueActions } from '../helpers/chat-active-status';
import { chatActiveStatusActionOptions } from '../helpers/chat-active-status';
import '../../../assets/chat/chat.scss';

const ChatActiveStatus = ({dialogueAssignedTo, dialogueSnap, source, clientApplicationsSnaps}) => {
  // const [selectOptions, setSelectOptions] = useState(chatActiveStatusOptions);
  const {authorizedUser} = useContext(ProgramContext)

  const handleChange = async (value, _option) => {
    if(value === dialogueActions.takeInpRogress.value) {
      if(clientApplicationsSnaps.length > 0) {
        for (const applicationSnap of clientApplicationsSnaps) {
          await updateDocField(applicationSnap.ref, "preparedInformation.assignedTo", authorizedUser.id);
        }
      }
      await updateDocField(dialogueSnap.ref, "assignedTo", authorizedUser.id);
    }

    if( value === dialogueActions.finish.value) {
      await updateDocField(dialogueSnap.ref, 'assignedTo', '')
      await updateDocField(dialogueSnap.ref, 'active', false)
    }
  }

  const value = dialogueAssignedTo ? chatCurrentStatus.inProgress : chatCurrentStatus.finished;
  const selectOptions =  dialogueAssignedTo ? chatActiveStatusActionOptions.finish : chatActiveStatusActionOptions.takeInProgress
  const disabled = (!dialogueAssignedTo && dialogueSnap.get('active')) || (dialogueAssignedTo === authorizedUser.id && !clientApplicationsSnaps?.length) ? false : true;

  return (
    <div className="chat__active-status">
      <Select
        popupMatchSelectWidth={false}
        disabled={disabled}
        style={{
          width: "fit-content",
        }}
        onSelect={handleChange}
        options={selectOptions}
        value={value}
        bordered={false}
      />
    </div>
  );
};

export default ChatActiveStatus;
