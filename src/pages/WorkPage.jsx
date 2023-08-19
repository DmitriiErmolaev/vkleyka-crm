import React, {useState} from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Head from "../components/layout/Head";
import Aside from "../components/layout/Aside";
import GlobalChat from "../components/chat/GlobalChat";

const {Content} = Layout;

const primeLayoutStyle = {
  width:"100%", 
  minHeight:"100vh",
  margin:"0 auto", 
  background:"#F8F8F8 !important" ,
}

const WorkPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
    if (key === "/chat") setDrawerOpen((prev) => !prev)
  }

  return (
    <div className="wrapper">
      <Layout className="primary-container" style={primeLayoutStyle}>
        <Head />
        <Layout hasSider>
          <Aside handleMenuSelect={handleMenuSelect}/>
          <Content 
            style={{
              backgroundColor:"#F8F8F8",
              position:"relative",
              overflow:"hidden",
            }}
          >
            {drawerOpen ? <GlobalChat drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/> : null}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default WorkPage;
