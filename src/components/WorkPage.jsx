import React, {useState} from "react";

import {Layout, Menu, Spin} from "antd";
import Head from "./Head";
import {Outlet, Link} from "react-router-dom"

// const data = getDocs(collection(firestore, "applications"), )


const {Sider, Content} = Layout;

const primeLayoutStyle = {
  width:"100%", 
  maxWidth:"1900px",
  minHeight:"100vh",
  margin:"0 auto", 
  background:"#F8F8F8 !important" , 
}

const siderMenuItems = [
  {key:"all applications",label:(<Link to="/">Все заявки</Link>),},
  {key:"start page",label:(<Link to="application">Тестовая заявка</Link>),},
]

const WorkPage = ()=> {
  const [currentPage, setCurrentPage] = useState(""); 

 

  const handleClick = (e) => {
    console.log(e.key)
    setCurrentPage(e.key)
  }

  return (
    <div className="wrapper">
      <Layout className="primary-container" style={primeLayoutStyle}>
        <Head handleClick={handleClick} currentPage={currentPage}/>
        <Layout hasSider>
          <Sider style={{zIndex:"1", position:"fixed", top:"81px", borderRadius:"0 20px 0 0", backgroundColor:"#767680", height:"calc(200vh - 81px)"}}>
              <Menu mode="inline" theme="dark" items={siderMenuItems} style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}} />
          </Sider>
          <Content style={{marginLeft:"200px", backgroundColor:"#F8F8F8"}}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default WorkPage;