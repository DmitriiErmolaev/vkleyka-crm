import React, {useState, useContext, useRef, useEffect} from 'react';
import {Layout, Menu, Drawer } from "antd";
import {useLocation} from "react-router-dom"
import {ProgramContext} from "../../models/context.js";
import {roleBasedContent} from "../../models/role-based-rules.js";
import DialoguesList from '../chat/DialoguesList.jsx';
import "../../assets/aside.scss"
const {Sider} = Layout;

const Aside = () => {
  const {role} = useContext(ProgramContext)
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuSelect = ({item, key, keyPath, selectedKeys, domEvent}) => {
    if (key === "/chat") setDrawerOpen((prev) => !prev)
  }
  // const dialoguesList = drawerOpen === true ? (<DialoguesList drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>) : null
  return (
    <Sider 
      style={{
        backgroundColor:"#182A67", 
        position:"relative",
        zIndex:"100",
      }}
    >
      <Menu 
        mode="inline" 
        theme="dark" 
        selectedKeys={[location.pathname]} 
        items={roleBasedContent[role].siderMenuItems} 
        style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}} 
        onSelect={handleMenuSelect}
      />
      <DialoguesList drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      {/* {dialoguesList} */}
    </Sider>
  );
};

export default Aside;
