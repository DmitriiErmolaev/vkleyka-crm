import React, {useContext} from 'react';
import {Layout, Menu} from "antd";
import {useLocation} from "react-router-dom"
import {UserContext} from "../../models/context.js";
import {roleBasedContent} from "../../models/role-based-rules.js";
const {Sider} = Layout;

const Aside = () => {
  const {role} = useContext(UserContext)
  const location = useLocation()
  
  return (
    <Sider 
      style={{
        borderRadius:"0 20px 0 0", 
        backgroundColor:"#767680", 
      }}
    >
      <Menu 
        mode="inline" 
        theme="dark" 
        selectedKeys={[location.pathname]} 
        items={roleBasedContent[role].siderMenuItems} 
        style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}} 
      />
    </Sider>
  );
};

export default Aside;
