import React, {useContext} from 'react';
import {ProgramContext} from "../../models/context.js";
import {DeleteOutlined } from "@ant-design/icons";
import {deleteOperator} from "../../models/operator/operators-data-processing.js";
import {getAdminsRef} from "../../models/operator/operators.js"
import { openNotification } from '../../models/notification/notification.js';
const ADMINS_REF = getAdminsRef();

const DeleteOperator = ({id}) => {
  const {admins, notificationApi} = useContext(ProgramContext);

  const handleDelete = async (idToDelete) => {
    //TODO: обработать
    try {
      deleteOperator(admins, ADMINS_REF, idToDelete);
      openNotification(notificationApi, "success", "opeartorDelete");
      openNotification(notificationApi, "warning", "opeartorDelete");
    } catch (e) {
      openNotification(notificationApi, "error", "opeartorDelete");
    }
  }  

  return (
    <div>
      <a href="#" onClick={() => handleDelete(id)}><DeleteOutlined/></a>
    </div>
  );
};

export default DeleteOperator;
