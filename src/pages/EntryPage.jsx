import React from "react";
import {Layout}  from "antd";
// import AuthForm from "./AuthForm";
// import RegisterForm from "./RegisterForm";
import {Outlet} from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";

const {Content} = Layout;

const primeLayoutStyle = {
  width:"100%", 
  maxWidth:"1280px",
  height:"100vh",
  margin:"0 auto", 
  backgroundColor:"white",
}

const EntryPage = () => {
  return (
    <div className="wrapper">
      <Layout className="primary-container" style={primeLayoutStyle} >
        <Content >
          <Outlet/>
        </Content>
      </Layout>
    </div>
  )
}
export default EntryPage;
