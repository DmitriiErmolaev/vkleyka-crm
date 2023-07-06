import React, {useContext} from "react"
import {useAuthState} from "react-firebase-hooks/auth";
import {useDocument} from "react-firebase-hooks/firestore";
import {createBrowserRouter, createRoutesFromElements,Routes, Route, Navigate} from "react-router-dom";
import {Spin} from 'antd';
import EntryPage from "../pages/EntryPage"
import WorkPage from "../pages/WorkPage"
import AuthForm from "./auth/AuthForm";
import ApplicationsTable from "./application/ApplicationsTable";
import ApplicationForm from "./application/ApplicationForm";
import Operators from "./operator/Operators";
import {auth} from "../models/firebase";
import {UserContext, AdminsContext} from "../models/context.js"
import { getAdminsRef } from "../models/operator/operators";
import { getSingleFieldFromDocSnapshot } from "../models/data-processing";
import { findRole } from "../models/operator/operators-data-processing";
import { GLOBAL_ROLES } from "../models/role-based-rules";
const ADMINS_REF = getAdminsRef();

const RoutesComponent = () => {
  const [user, loading, error] = useAuthState(auth);
  const [adminsDocSnapshot, adminsLoading, adminsError] = useDocument(ADMINS_REF);

  console.log("Firebase-auth слушатель: ", user);

  if(loading) {
    return (
      <div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Spin size="large"/>
      </div>
    )
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
      <UserContext.Provider value={{user: user, role: role}}>
        <Routes>
          <Route path="/" element={<WorkPage />}>
              <Route index element={< ApplicationsTable/>}/>
              <Route path="application/:appId" element={< ApplicationForm user={user}/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </UserContext.Provider>
    )
  }
    
  if(role === GLOBAL_ROLES.admin) {
    return  (
      <UserContext.Provider value={{user: user, role: role}}>
        <AdminsContext.Provider value={{admins: adminsData}}>
          <Routes>
            <Route path="/" element={<WorkPage />}>
                <Route index element={< ApplicationsTable />}/>
                <Route path="users-manager" element={< Operators/>}/>
                <Route path="application/:appId" element={< ApplicationForm user={user}/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/" replace={true}/>}/>
          </Routes>
        </AdminsContext.Provider >
      </UserContext.Provider>
    )
  }
}

export default RoutesComponent
