import React, { useRef } from "react"
import {useAuthState} from "react-firebase-hooks/auth";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {Routes, Route, Navigate} from "react-router-dom";
import {Spin, notification} from 'antd';
import EntryPage from "../pages/EntryPage"
import WorkPage from "../pages/WorkPage"
import ApplicationContainer from "../pages/ApplicationWorkArea/components/ApplicationContainer.jsx";
import Error from "./error/Error";
import { auth } from "../firebase/firebase.js";
import { ProgramContext } from "../models/context.js"
import { getAdminsRef } from "../firebase/admins/getAdminsRef.js";
import { GLOBAL_ROLES } from "../models/role-based-rules";
import { getAuthorizedOperator } from "../models/operator/operators-data-processing";
import NotificationsBoard from "./notifications/NotificationsBoard";
import AuthContainer from "./auth/AuthContainer.jsx";
import Applications from "../modules/Applications/components/Applications.jsx";
import ProfilePage from "../pages/Profile/components/ProfilePage.jsx";
import AccountsManager from "../pages/AccountsManager/components/AccountsManager.jsx";
import { Timestamp } from "firebase/firestore";
import ApplicationWorkArea from "../pages/ApplicationWorkArea/components/ApplicationWorkArea.jsx";

const ADMINS_REF = getAdminsRef();

const notificationsConfigGlobal = {
  closeIcon: true,
  placement: 'topRight',
  stack: {
    threshold: 3,
  },
}

const RoutesComponent = () => {
  const [api, contextHolder] = notification.useNotification(notificationsConfigGlobal);
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
      <ProgramContext.Provider value = {{user, authorizedUser, role, admins: adminsData.admins, notificationAPI:api}}>
        {contextHolder}
        <Routes>
          <Route path="/" element={ <WorkPage /> }>
            <Route index element={ <Applications/> }/>
            <Route path="user-profile" element={< ProfilePage />}/>
            <Route path="notifications" element={< NotificationsBoard />}/>
            <Route path="application/:clientId/:appId" element={< ApplicationWorkArea />}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </ProgramContext.Provider>
    )
  }

  if(role === GLOBAL_ROLES.admin) {
    return  (
      <ProgramContext.Provider value = {{user, authorizedUser, role, admins: adminsData.admins, notificationAPI:api}}>
        {contextHolder}
        <Routes>
          <Route path="/" element={<WorkPage />}>
            <Route index element={< Applications />}/>
            <Route path="users-manager" element={<AccountsManager/>}/>
            <Route path="user-profile" element={<ProfilePage />}/>
            <Route path="notifications" element={<NotificationsBoard />}/>
            <Route path="application/:clientId/:appId" element={<ApplicationWorkArea />}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Routes>
      </ProgramContext.Provider>
    )
  }
}

export default RoutesComponent;
