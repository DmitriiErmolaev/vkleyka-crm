import React from 'react';
import Auth from './Auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../models/firebase';

const contentInsideLayoutStyle = {
  // flexDirection:"row",
  // display:'flex',
  width:"45%",
  padding:'50px 100px',
  minHeight:"49vh",
  // backgroundColor:"#F8F8F8",
  justifyContent:"center",
  boxShadow:"3px 3px 6px 2px #0000002c",
  // backgroundColor:"inherit",
  backgroundColor: 'white',
}

const AuthContainer = () => {

  const onFinish = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      throw e;
    }
  }

  return (
    <div
      style={contentInsideLayoutStyle}
    >
      <Auth onFinish={onFinish}/>
    </div>
  );
};

export default AuthContainer;