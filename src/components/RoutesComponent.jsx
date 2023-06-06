import React from "react"
import {useAuthState} from "react-firebase-hooks/auth";
import {createBrowserRouter, createRoutesFromElements,Routes, Route, Navigate} from "react-router-dom";
import EntryPage from "./EntryPage"
import AuthForm from "./AuthForm";
import RegisterForm from "./RegisterForm";
import WorkPage from "./WorkPage"
import ApplicationsTable from "./ApplicationsTable";
import Application from "./Application";
import { auth } from "../firebase";
import { Spin } from 'antd';

const RoutesComponent = () => {
  const [user, loading, error] = useAuthState(auth);

  if(loading) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
  }

  return user ?
    (
      <Routes>
        <Route path="/" element={<WorkPage/>}>
            <Route index element={< ApplicationsTable/>}/>
            <Route path="application/:id" element={< Application/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true}/>} />
      </Routes>
    ) : (
      <Routes>
        <Route path="login" element={<EntryPage />}>
          <Route index element={<AuthForm/>}/>
          <Route path="register" element={<RegisterForm/>}/>
        </Route>
        <Route path="*" element={<Navigate to="login" replace={true}/>} />
      </Routes>
      
    )
  // return user ? (
  
  //   <Routes>
  //     <Route path="/" element={<WorkPage/>}  >
  //       <Route path="all-applications" element={< ApplicationsTable/>}/>
  //       <Route path="application" element={< Application/>}/>
  //     </Route>
  //   <Routes/>
  //   )
  //  : 
  //   <Routes>
  //     <Route path="/" element={<EntryPage/>} loader={() => }/>
  //   </Routes>
    
  

}


export default RoutesComponent