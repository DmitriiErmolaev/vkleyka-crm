import {initializeApp}  from "firebase/app";
import {browserLocalPersistence, getAuth, initializeAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage, ref} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDChq_tDI936uUYMSnrqCuAso5I85JC55c",
  authDomain: "vkleykakz.firebaseapp.com",
  projectId: "vkleykakz",
  storageBucket: "vkleykakz.appspot.com",
  messagingSenderId: "586834879283",
  appId: "1:586834879283:web:ec622f286ccc7f3fb5d446",
  measurementId: "G-J8DQLMKF5G"
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

