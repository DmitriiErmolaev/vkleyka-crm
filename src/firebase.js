import {initializeApp}  from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage, ref} from "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyANbrjb9mwO5FeWI0i7Z39cnB1sZ0CgW8c",
  authDomain: "visa-app-6715b.firebaseapp.com",
  projectId: "visa-app-6715b",
  storageBucket: "visa-app-6715b.appspot.com",
  messagingSenderId: "1036308338996",
  appId: "1:1036308338996:web:cdc33b05f2efbe415bad61",
  measurementId: "G-V30T1YW8HJ",
  storageBucket: "gs://visa-app-6715b.appspot.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)
const storage = getStorage(app)

const storageReference = ref(storage)

const role = "admin";

export  {app as firebase, auth, firestore, storage, role} 

