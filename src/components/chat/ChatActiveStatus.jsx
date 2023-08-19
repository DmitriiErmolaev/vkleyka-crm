import React, {useContext} from 'react';
import { Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ProgramContext } from '../../models/context';
import { updateDocField } from '../../models/data-processing';

const ChatActiveStatus = ({dialogueAssignedTo, dialogueRef, source}) => {
  const {authorizedOperator} = useContext(ProgramContext)

  const handleTagClick = async () => {
    if(!dialogueAssignedTo) {
      await updateDocField(dialogueRef, "assignedTo", authorizedOperator.id)
    }
    if(dialogueAssignedTo) {
      await updateDocField(dialogueRef, "assignedTo", '')
    }
  }
  
  const icon = source === "application" 
    ? null 
    : (
      dialogueAssignedTo 
        ? <CloseCircleOutlined style={{color:"red"}} onClick={handleTagClick} />
        : <CheckCircleOutlined style={{color:"#36CE00"}} onClick={handleTagClick} />
    )
  
  

  const dialogueIsActiveStatus = dialogueAssignedTo 
    ? 'Активен'
    : 'Завершен'
  const tagColor = dialogueAssignedTo 
    ? 'green'
    : 'geekblue'

  return (  
    <div className="dialogue-is-active-status">
      <Tag 
        color={tagColor}
        icon={icon}
      >
        {dialogueIsActiveStatus}  
      </Tag>
    </div>
  );
};

export default ChatActiveStatus;
