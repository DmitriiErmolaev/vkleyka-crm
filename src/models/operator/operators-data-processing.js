import {runTransaction, updateDoc} from "firebase/firestore";
import { GLOBAL_ROLES } from "../role-based-rules";
import { beforeAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { getAdminsRef } from "./operators";
import { openNotification } from "../notification/notification";

export const reassign = async (appsCollSnap, chatCollSnap, selectedOperator, notificationApi) => {
  // если один из методов транзакции провалится - все изменения будут невыполнены.
  try {
    await runTransaction(firestore, async (transaction) => {
      if(appsCollSnap.size) {
        appsCollSnap.docs.map(appDoc => transaction.update(appDoc.ref, "preparedInformation.assignedTo", selectedOperator));
      }
      if(chatCollSnap.size) transaction.update(chatCollSnap.docs[0].ref, 'assignedTo', selectedOperator);
    })
    openNotification(notificationApi, 'success', 'reassignOperator' )
  } catch (error) {
    console.log(error)
    openNotification(notificationApi, 'error', 'reassignOperator')
  }
}

export const deleteOperator = async (admins, id, notificationApi) => {
  try {
    const adminsAfterDeletion = admins.filter((admin)=> {
      if(admin.id === id ) return false;
      return true;
    })
    await updateDoc(getAdminsRef(), {admins: adminsAfterDeletion})
    openNotification(notificationApi, "success", "opeartorDelete");
    openNotification(notificationApi, "warning", "opeartorDelete");
  } catch (error) {
    console.log(error)
    openNotification(notificationApi, "error", "opeartorDelete");
  }
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
  return findedUser.role;
}

export const getAuthorizedOperator = (admins, authorizedUserID) => {
  const findedUser = admins.find((admin) => {
    return admin.id === authorizedUserID;
  })
  return findedUser;
}

export const findOperatorName = (admins, userID) => {
  const findedUser = admins.find((admin) => {
    return admin.id === userID;
  })
  return findedUser.name;
}

export const createNewUser = async (values, admins) => {
  try {
    const newUser = await createNewAuth(values.email, values.pass);
    createDbOperatorObject(admins, values, newUser )
  } catch(e) {
    console.log(e)
    throw e
  }
}

const createNewAuth = (email, pass) => {
  return new Promise((resolve,reject) => {
    const unsubscribe = beforeAuthStateChanged(auth,  (newUser) => {
      resolve(newUser);
      throw new Error("выброс ошибки блокирует автоматическую авторизацию нового пользвоателя")
    })
    
    createUserWithEmailAndPassword(auth, email, pass)
      .catch((e) => {
        if(e.message === "auth/login-blocked"){
          //it's ok. Блокируется автоматическая авторизация под новым аккаунтом.
        } else {
          console.log(e.code)
          reject(e) 
        }
      }).finally(unsubscribe)
  })
}

const createDbOperatorObject = async (admins, newOperatorFormValues, newUser ) => {
  const updatedAdmins = [...admins, {
    id: newUser.uid,
    name: `${newOperatorFormValues.name} ${newOperatorFormValues.surname}`,
    role: GLOBAL_ROLES.operator,
    phoneNumber: newOperatorFormValues.tel,
    email: newUser.email,
    
  }]
  await updateDoc(getAdminsRef(), {admins: updatedAdmins } );
}

export const updateOperator = async (updatedAdmins) => {
  try {
    await updateDoc(getAdminsRef(), {admins: updatedAdmins});
  } catch (e) {
    throw e;
  }
}