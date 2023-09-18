import React, { useContext } from 'react';
import {Layout, Menu } from "antd";
import {useLocation} from "react-router-dom"
import {ProgramContext} from "../../models/context.js";
import {roleBasedContent} from "../../models/role-based-rules.js";
import "../../assets/aside.scss"
const {Sider} = Layout;

const Aside = ({handleMenuSelect}) => {
  const { role } = useContext(ProgramContext)
  const location = useLocation()

  return (
    <Sider 
      className="aside"
    >
      <Menu 
        mode="inline" 
        theme="dark" 
        selectedKeys={[location.pathname]} 
        items={roleBasedContent[role].siderMenuItems} 
        style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}} 
        onSelect={handleMenuSelect}
      />
    </Sider>
  );
};

export default Aside;
