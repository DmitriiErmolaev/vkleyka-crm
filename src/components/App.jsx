import React from "react"
import {useAuthState} from "react-firebase-hooks/auth";
import {useDocument, useDocumentData} from "react-firebase-hooks/firestore";
import {Routes, Route, Navigate} from "react-router-dom";
import {Spin, notification} from 'antd';
import EntryPage from "../pages/EntryPage"
import WorkPage from "../pages/WorkPage"
import AuthForm from "./auth/AuthForm";
import AllApplications from "./application/AllApplications";
import ApplicationForm from "./application/ApplicationForm";
import ApplicationContainer from "./application/ApplicationContainer";
import Operators from "./operator/Operators";
import Error from "./error/Error";
import {auth} from "../models/firebase";
import { ProgramContext } from "../models/context.js"
import { getAdminsRef } from "../models/operator/operators.js";
import { getSingleFieldFromDocSnapshot } from "../models/data-processing";
import { GLOBAL_ROLES } from "../models/role-based-rules";
import { getAuthorizedOperator } from "../models/operator/operators-data-processing";
import Profile from "./profile/Profile";
import NotificationsBoard from "./notifications/NotificationsBoard";
import AuthContainer from "./auth/AuthContainer.jsx";

const ADMINS_REF = getAdminsRef();

const RoutesComponent = () => {
  const [api, contextHolder] = notification.useNotification();
  const [user, loading, error] = useAuthState(auth);
  const [adminsData, adminsLoading, adminsError, adminsDocSnapshot] = useDocumentData(ADMINS_REF)

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
        <Route path="login" element={
          <EntryPage>
            <AuthContainer />
          </EntryPage>
        }
        />
        <Route path="*" element={<Navigate to="login" replace={true}/>} />
      </Routes>
    )
  }

  const authorizedUser = getAuthorizedOperator(adminsData.admins, user.uid)
  const role = authorizedUser.role;

  if(role === GLOBAL_ROLES.operator) {
    return  (
      <ProgramContext.Provider value = {{user, authorizedUser, role, admins: adminsData.admins, notificationApi:api}}>
        {contextHolder}
        <Routes>
          <Route path="/" element={ <WorkPage /> }>
            <Route index element={ <AllApplications/> }/>
            <Route path="user-profile" element={< Profile />}/>
            <Route path="notifications" element={< NotificationsBoard />}/>
            <Route path="application/:clientId/:appId" element={< ApplicationContainer />}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </ProgramContext.Provider>
    )
  }

  if(role === GLOBAL_ROLES.admin) {
    return  (
      <ProgramContext.Provider value = {{user, authorizedUser, role, admins: adminsData.admins, notificationApi:api}}>
        {contextHolder}
        <Routes>
          <Route path="/" element={<WorkPage />}>
            <Route index element={< AllApplications />}/>
            <Route path="users-manager" element={<Operators/>}/>
            <Route path="user-profile" element={<Profile />}/>
            <Route path="notifications" element={<NotificationsBoard />}/>
            <Route path="application/:clientId/:appId" element={<ApplicationContainer />}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </ProgramContext.Provider>
    )
  }
}

export default RoutesComponent;
