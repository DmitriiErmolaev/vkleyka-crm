import React, {useContext} from "react"
import {useAuthState} from "react-firebase-hooks/auth";
import {createBrowserRouter, createRoutesFromElements,Routes, Route, Navigate} from "react-router-dom";
import EntryPage from "./EntryPage"
import AuthForm from "./AuthForm";
import WorkPage from "./WorkPage"
import ApplicationsTable from "./ApplicationsTable";
import Application from "./Application";
import UsersManager from "./UsersManager";
import { auth } from "../firebase";
import { Spin } from 'antd';
import {ROLES} from "../auth-access.js";
import {UserContext} from "../context.js"

const RoutesComponent = () => {
  const [user, loading, error] = useAuthState(auth);
  const role = "admin";

  if(loading) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
  }

  if(!user || !role){
    return (
      <Routes>
        <Route path="login" element={<EntryPage />}>
          <Route index element={<AuthForm/>}/>
        </Route>
        <Route path="*" element={<Navigate to="login" replace={true}/>} />
      </Routes>
    )
  }

  if(role === ROLES.operator) {
    return  (
      <UserContext.Provider value={{user: user}}>
        <Routes>
          <Route path="/" element={<WorkPage />}>
              <Route index element={< ApplicationsTable/>}/>
              <Route path="application/:appId" element={< Application user={user}/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </UserContext.Provider>
    )
  }
    
  if(role === ROLES.admin) {
    return  (
      <UserContext.Provider value={{user: user,}}>
        <Routes>
          <Route path="/" element={<WorkPage />}>
              <Route index element={< ApplicationsTable/>}/>
              <Route path="users-manager" element={< UsersManager/>}/>
              <Route path="application/:appId" element={< Application user={user}/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </UserContext.Provider>
    )
  }















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
