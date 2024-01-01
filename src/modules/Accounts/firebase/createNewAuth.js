import { beforeAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";

export const createNewAuth = (email, pass) => {
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
};
