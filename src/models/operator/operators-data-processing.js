import {updateDoc} from "firebase/firestore";
import { GLOBAL_ROLES } from "../role-based-rules";
import { beforeAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getAdminsRef } from "./operators";

const ADMINS_REF = getAdminsRef();  

export const createDbOperatorObject = async (admins, ref, newOperatorFormValues, newUser ) => {
  const updatedAdmins = [...admins, {
    key: newUser.uid,
    id: newUser.uid,
    name: `${newOperatorFormValues.name} ${newOperatorFormValues.surname}`,
    role: GLOBAL_ROLES.operator,
    phoneNumber: newOperatorFormValues.tel,
    email: newUser.email,
    appsNew: 0,
    appsInProgress: 0,
    appsFinished: 0,
  }]
  await updateDoc(ref,{admins: updatedAdmins } );
}

export const deleteOperator = async (admins, ref,  id) => {
  const updatedAdmins = admins.filter((admin)=> {
    if(admin.id === id ){
      return false;
    }
    return true;
  })
  await updateDoc(ref,{admins: updatedAdmins});
}

export const getOnlyOperators = (admins) => {
  return admins.reduce((accum, user ) => {
    if(user.role === "operator") {
      accum.push(user);
      return accum
    }
    return accum
  },[])
}

export const findRole = (admins, authorizedUser) => {
  const findedUser = admins.find((admin) => {
    return admin.email === authorizedUser.email;
  })
  console.log(findedUser)
  return findedUser.role;
}

export const findAuthorizedOperatorName = (admins, authorizedUser) => {
  const findedUser = admins.find((admin) => {
    return admin.id === authorizedUser.uid;
  })
  console.log(findedUser)
  return findedUser.name;
}

export const createNewUser = async (values, admins) => {
  try {
    const newUser = await createNewAuth(values.email, values.pass);
    createDbOperatorObject(admins, ADMINS_REF, values,newUser )
  } catch(e) {
    throw e
  }
  
}

export const createNewAuth = (email, pass) => {
  try {
    return new Promise((resolve,reject) => {
      const unsubscribe = beforeAuthStateChanged(auth,  (newUser) => {
        resolve(newUser);
        throw new Error("выброс ошибки блокирует автоматическую авторизацию нового пользвоателя")
      })
      
      createUserWithEmailAndPassword(auth, email, pass)
        .catch((e) => {
          console.log(e)
          if(e.message === "auth/login-blocked"){
            //it's ok
          } 
          if(e.message === "auth/email-already-in-use") {
            throw e
          }
        }).finally(unsubscribe)
    })
  } catch(e) {
    throw e
  } 
}