import React, {useContext} from 'react';
import {AdminsContext} from "../../models/context.js";
import {DeleteOutlined } from "@ant-design/icons";
import {deleteOperator} from "../../models/operator/operators-data-processing.js";
import {getAdminsRef} from "../../models/operator/operators.js"
import { deleteUser } from 'firebase/auth';

const ADMINS_REF = getAdminsRef();

const DeleteOperator = ({id}) => {
  const {admins} = useContext(AdminsContext);
  
  const handleDelete = async (idToDelete) => {
    //TODO: обработать
    deleteOperator(admins, ADMINS_REF, idToDelete);
  }  

  return (
    <div>
      <a href="#" onClick={() => handleDelete(id)}><DeleteOutlined/></a>
    </div>
  );
};

export default DeleteOperator;