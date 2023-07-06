import {initializeApp}  from "firebase/app";
import {browserLocalPersistence, getAuth, initializeAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage, ref} from "firebase/storage"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,  
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,  
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,  
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,  
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,  
  appId: process.env.REACT_APP_FIREBASE_APPID,  
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,  
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
})

const firestore = getFirestore(app)
const storage = getStorage(app)

const storageReference = ref(storage)

const role = "admin";

export  {app as firebase, auth, firestore, storage, role} 

