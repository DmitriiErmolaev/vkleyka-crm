import {updateDoc} from "firebase/firestore";
import { GLOBAL_ROLES } from "../role-based-rules";
import { beforeAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getAdminsRef } from "./operators";

const ADMINS_REF = getAdminsRef();  

export const createDbOperatorObject = async (admins, ref, newOperatorFormValues, uid ) => {
  const updatedAdmins = [...admins, {
    key: uid,
    name: `${newOperatorFormValues.name} ${newOperatorFormValues.surname}`,
    role: GLOBAL_ROLES.operator,
    phoneNumber: newOperatorFormValues.tel,
    email: newOperatorFormValues.email,
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
  console.log(findedUser)
  return findedUser.role;
}

export const createNewUser = async (values, admins) => {
  const newUser = await createNewAuth(values.email, values.pass);
  createDbOperatorObject(admins, ADMINS_REF, values,newUser.uid )
}

export const createNewAuth = (email, pass) => {
  return new Promise((resolve,reject) => {
    const unsubscribe = beforeAuthStateChanged(auth,  (newUser) => {
      resolve(newUser);
      throw new Error("выброс ошибки блокирует автоматическую авторизацию нового пользвоателя")
    })
    createUserWithEmailAndPassword(auth, email, pass).catch((error) => {
      console.log(error)
    }).finally(unsubscribe)
  })
}