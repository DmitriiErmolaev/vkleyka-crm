import React, {useState, useRef, useEffect} from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Head from "../components/layout/Head";
import Aside from "../components/layout/Aside";
import GlobalChat from "../components/chat/GlobalChat";
import '../assets/workpage.scss';
import { useCollection } from "react-firebase-hooks/firestore";
import { getClientsQuery } from "../models/clients/clients";
import Error from "../components/error/Error";
import { WorkPageContext } from "../models/context";
import { incomeMessageNotification } from "../models/income-message/income-message";

const {Content} = Layout;

const WorkPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const contentRef = useRef(null);
  const [clientsCollSnapshot, clientsLoading, clientsError] = useCollection(getClientsQuery());

  if (clientsLoading) {
    return 
  }
  if (clientsError) {
    return <Error error={clientsError}/>
  }
  const handleMenuSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
    if (key === "/chat") setDrawerOpen((prev) => !prev)
  }
  
  const globalChatComponent = drawerOpen ? <GlobalChat drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} /> : null

  return (
    <WorkPageContext.Provider value={{clientsCollSnapshot:clientsCollSnapshot}}>
      <Layout className="workpage">
        <Head />
        <Layout className="main" hasSider>
          <Aside handleMenuSelect={handleMenuSelect}/>
          <Content 
            ref={contentRef}
            className="content"
          >
            {globalChatComponent}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </WorkPageContext.Provider>
  )
}

export default WorkPage;

