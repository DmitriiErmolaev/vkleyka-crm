import React from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Head from "../components/layout/Head";
import Aside from "../components/layout/Aside";
const {Content} = Layout;

const primeLayoutStyle = {
  width:"100%", 
  minHeight:"100vh",
  margin:"0 auto", 
  background:"#F8F8F8 !important" ,
}

const WorkPage = () => {
  return (
    <div className="wrapper">
      <Layout className="primary-container" style={primeLayoutStyle}>
        <Head />
        <Layout hasSider>
          <Aside />
          <Content 
            style={{
              backgroundColor:"#F8F8F8"
            }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default WorkPage;
