import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
//-----стили для ручных компонентов------------------//
//import '../assets/web.scss';
//*
//*
//-----ручные компоненты-----------------------------//
// import Header from "./Header";
// import Main from "./Main";
// import Aside from "./Aside";
//*
//*
//-----стили для верстки на Ant Design---------------//
// import "../assets/ant-styles/web-ant.scss";
//-----компоненты Ant Design-------------------------//
import {Layout} from "antd";
import {Col, Row} from "antd";
import RegistrationForm from "./RegistrationForm";
import ViserPage from "./ViserPage";
import Application from "./Application";
import Test from "./Test";



const {Header, Sider, Content, Footer} = Layout;

const primeLayoutStyle = {
  width:"100%", 
  maxWidth:"1280px",
  height:"100vh",
  margin:"0 auto", 
  backgroundColor:"white",
}

const contentInsideLayoutStyle = {
  width:"60%", 
  minHeight:"400px", 
  margin:"100px auto 0", 
  backgroundColor:"#F8F8F8", 
  justifyContent:"center", 
  alignItems:"center",  
  boxShadow:"3px 3px 6px 2px #0000002c",
}

const headerStyle = {
  height:"81px", 
  boxShadow:"0 3px 6px 2px #0000002c",
  backgroundColor:"#F8F8F8", 
}
const Web = () => {

  if(true){
    return(
      // <ViserPage/>
      <Application/>
      // <Test />
    )
  }

  // return (
  //   // <Router>
  //     <div className="wrapper">
  //       <Layout className="primary-container" style={primeLayoutStyle} >
  //         <Header style={headerStyle}>
  //         </Header>
  //         <Content >
  //           <Layout style={contentInsideLayoutStyle}>
  //             <RegistrationForm />
  //           </Layout>
  //         </Content>
  //       </Layout>
  //     </div>
  //   // </Router>

  // )

  // return (
  //   <div className="wrapper">
  //     <div className="container">
  //       <Header />
  //       <div className="secondary-container">
  //         <Aside />
  //         <Main />
  //       </div>
        
    
  //     </div>
  //   </div>
  // );
}

export default Web;
