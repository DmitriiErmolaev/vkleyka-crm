import React, {useContext} from 'react';
import {Layout, Menu} from "antd";
import {useLocation} from "react-router-dom"
import {UserContext} from "../../models/context.js";
import {roleBasedContent} from "../../models/role-based-rules.js";

const {Sider} = Layout;

const Aside = () => {
  const {role} = useContext(UserContext)
  const location = useLocation()

  // отвечает за стилизацию выбранного пункта бокового меню 
  const getCurrRoute = () => {
    const selectedKey = location.pathname;
    return [selectedKey]
  }
  
  return (
    <Sider 
      style={{
        // zIndex:"1", 
        // position:"fixed", 
        // top:"81px", 
        borderRadius:"0 20px 0 0", 
        backgroundColor:"#767680", 
        // height:"calc(200vh - 81px)"
      }}
    >
      <Menu 
        mode="inline" 
        theme="dark" 
        selectedKeys={getCurrRoute()} 
        items={roleBasedContent[role].siderMenuItems} 
        style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}} 
      />
    </Sider>
  );
};

export default Aside;