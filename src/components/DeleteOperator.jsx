import React, {useContext} from 'react';
import {OperatorsFirestoreDocRefs} from "../context.js"
import {DeleteOutlined } from "@ant-design/icons";
import {deleteDoc} from "firebase/firestore";


const handleDelete = async (index, refs) => {
  //TODO: обработать
  await deleteDoc(refs[index]);
}

const DeleteOperator = ({index}) => {
  const operatorsRefsArray = useContext(OperatorsFirestoreDocRefs)
  
  return (
    <div>
      <a href="#" onClick={() => handleDelete(index, operatorsRefsArray )}><DeleteOutlined /></a>
    </div>
  );
};

export default DeleteOperator;