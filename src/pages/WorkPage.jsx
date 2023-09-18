import React, {useState, useRef, useEffect} from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Head from "../components/layout/Head";
import Aside from "../components/layout/Aside";
import GlobalChat from "../components/chat/GlobalChat";
import '../assets/workpage.scss';

const {Content} = Layout;

const WorkPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const contentRef = useRef(null);

  const handleMenuSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
    if (key === "/chat") setDrawerOpen((prev) => !prev)
  }

  const globalChatComponent = drawerOpen ? <GlobalChat drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} /> : null

  return (
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
  )
}

export default WorkPage;

