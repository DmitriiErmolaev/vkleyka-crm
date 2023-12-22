import React, {useContext} from 'react';
import {DeleteOutlined } from "@ant-design/icons";

const DeleteOperatorButton = ({openPopupToReassign}) => {

  const handleClick = () => {
    openPopupToReassign();
  }

  return (
    <div>
      <a href="#" onClick={handleClick}><DeleteOutlined/></a>
    </div>
  );
};

export default DeleteOperatorButton;
