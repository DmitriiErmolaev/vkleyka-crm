import {updateDoc} from "firebase/firestore";
import { GLOBAL_ROLES } from "../role-based-rules";

export const createDbOperatorObject = async (admins, ref, operatorInfo, uid ) => {
  const updatedAdmins = [...admins, {
    key: uid,
    name: `${operatorInfo.name} ${operatorInfo.surname}`,
    role: GLOBAL_ROLES.operator,
    phoneNumber: operatorInfo.tel,
    email: operatorInfo.email,
    appCompleted: 0,
  }]
  await updateDoc(ref,{admins: updatedAdmins } );
}

export const deleteOperator = async (admins, ref,  indexToDelete) => {
  const updatedAdmins = admins.filter((admin, index)=> {
    if(index === indexToDelete ){
      return false;
    }
    return true;
  })
  await updateDoc(ref,{admins: updatedAdmins});
}

export const findRole = (admins, authorizedUser) => {
  const findedUser = admins.find((admin) => {
    return admin.email === authorizedUser.email;
  })
  return findedUser.role;
}

