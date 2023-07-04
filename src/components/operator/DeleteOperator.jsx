import React, {useContext} from 'react';
import {AdminsContext} from "../../models/context.js";
import {DeleteOutlined } from "@ant-design/icons";
import {updateDoc} from "firebase/firestore";
import {deleteOperator} from "../../models/operator/operators-data-processing.js";
import {getAdminsRef} from "../../models/operator/operators.js"

const ADMINS_REF = getAdminsRef();

const DeleteOperator = ({index}) => {
  const admins = useContext(AdminsContext);
  
  const handleDelete = async (indexToDelete) => {
    //TODO: обработать
    deleteOperator(admins, ADMINS_REF, indexToDelete);
  }  

  return (
    <div>
      <a href="#" onClick={() => handleDelete(index)}><DeleteOutlined/></a>
    </div>
  );
};

export default DeleteOperator;