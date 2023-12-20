import React from "react";
import {Layout}  from "antd";
import {Outlet} from "react-router-dom";
import '../assets/pages/entry-page.scss';
import Auth from "../components/auth/Auth";
import AuthContainer from "../components/auth/AuthContainer";

const {Content} = Layout;

const primeLayoutStyle = {
  // width:"100%",
  // maxWidth:"1280px",
  height:"100vh",
  // margin:"0 auto",
  backgroundColor:"white",
}

const EntryPage = ({children}) => {
 
  return (
    <Layout className="wrapper" >
      <Content className='entry-page__primary-container'>
        {children}
      </Content>
    </Layout>
  )
}

export default EntryPage;
