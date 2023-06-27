import React, {useContext} from "react";
import {Layout, Menu} from "antd";
import Head from "./Head";
import {UserContext} from "../context.js";
import {Outlet, Link, useLocation} from "react-router-dom"

const {Sider, Content} = Layout;

const primeLayoutStyle = {
  width:"100%", 
  minHeight:"100vh",
  margin:"0 auto", 
  background:"#F8F8F8 !important" ,
}

const roleBasedContent = {
  admin:{
    siderMenuItems: [
      {
        key:"/",
        label:(<Link to="/">Все заявки</Link>),
      },
      {
        key:"/users-manager",
        label:(<Link to="users-manager">Менеджер аккаунтов</Link>)
      }
    ]
  },
  operator:{
    siderMenuItems: [
      {
        key:"/",
        label:(<Link to="/">Все заявки</Link>),
      },
      {
        key:"/chat",
        label:(<Link to="chat">Чат</Link>)
      }
    ]
  }
}

const WorkPage = () => {
  const {role} = useContext(UserContext)
  console.log(role)
  const location = useLocation()
  // const role = "admin";

  const getRouteRendered = () => {
    // отвечает за стилизацию выбранного пункта бокового меню 
    const selectedKey = location.pathname;
    return [selectedKey]
  }

  return (
    <div className="wrapper">
      <Layout className="primary-container" style={primeLayoutStyle}>
        <Head />
        <Layout hasSider>
          <Sider 
            style={{
              zIndex:"1", 
              position:"fixed", 
              top:"81px", 
              borderRadius:"0 20px 0 0", 
              backgroundColor:"#767680", 
              height:"calc(200vh - 81px)"
            }}>
              <Menu 
                mode="inline" 
                theme="dark" 
                selectedKeys={getRouteRendered()} 
                items={roleBasedContent[role].siderMenuItems} 
                style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}} 
              />
          </Sider>
          <Content style={{marginLeft:"200px", backgroundColor:"#F8F8F8"}}>
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default WorkPage;
