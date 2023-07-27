import React from "react"
import {useAuthState} from "react-firebase-hooks/auth";
import {useDocument} from "react-firebase-hooks/firestore";
import {Routes, Route, Navigate} from "react-router-dom";
import {Spin, notification} from 'antd';
import EntryPage from "../pages/EntryPage"
import WorkPage from "../pages/WorkPage"
import AuthForm from "./auth/AuthForm";
import AllApplications from "./application/AllApplications";
import ApplicationForm from "./application/ApplicationForm";
import Operators from "./operator/Operators";
import Error from "./error/Error";
import {auth} from "../models/firebase";
import { ProgramContext } from "../models/context.js"
import { getAdminsRef } from "../models/operator/operators";
import { getSingleFieldFromDocSnapshot } from "../models/data-processing";
import { findRole } from "../models/operator/operators-data-processing";
import { GLOBAL_ROLES } from "../models/role-based-rules";

const RoutesComponent = () => {
  const [api, contextHolder] = notification.useNotification();
  const [user, loading, error] = useAuthState(auth);
  const ADMINS_REF = getAdminsRef();
  const [adminsDocSnapshot, adminsLoading, adminsError] = useDocument(ADMINS_REF)

  if(loading || adminsLoading) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
  }

  if (error || adminsError) {
    return <Error error={error || adminsError}/>
  }
 
  if(!user) {
    return (
      <Routes>
        <Route path="login" element={<EntryPage />}>
          <Route index element={<AuthForm/>}/>
        </Route>
        <Route path="*" element={<Navigate to="login" replace={true}/>} />
      </Routes>
    )
  }

  let role = null;
  let adminsData = [];

  if(!adminsLoading) {
    adminsData = getSingleFieldFromDocSnapshot(adminsDocSnapshot, "admins");
    role = findRole(adminsData, user);
  }

  if(role === GLOBAL_ROLES.operator) {
    return  (
      <ProgramContext.Provider value = {{user: user, role: role,admins: adminsData, api:api}}>
        {contextHolder}
        <Routes>
          <Route path="/" element={<WorkPage />}>
            <Route index element={< AllApplications/>}/>
            <Route path="application/:appId" element={< ApplicationForm user={user}/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </ProgramContext.Provider>
    )
  }
    
  if(role === GLOBAL_ROLES.admin) {
    return  (
      <ProgramContext.Provider value = {{user: user, role: role,admins: adminsData, api:api}}>
        {contextHolder}
        <Routes>
          <Route path="/" element={<WorkPage />}>
            <Route index element={< AllApplications />}/>
            <Route path="users-manager" element={< Operators/>}/>
            <Route path="application/:appId" element={< ApplicationForm user={user}/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </ProgramContext.Provider>
    )
  }
}

export default RoutesComponent
