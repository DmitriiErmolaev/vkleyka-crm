import React, { useContext } from 'react';
import {Layout, Menu } from "antd";
import {useLocation} from "react-router-dom"
import {ProgramContext} from "../../../models/context.js";
import {roleBasedContent} from "../../../models/role-based-rules.js";
import "../../../assets/aside.scss"
import SiderMenu from './SiderMenu.jsx';
const {Sider} = Layout;

const Aside = ({handleMenuSelect, chatListOpen}) => {
  return (
    <Sider
      className="aside"
    >
      <SiderMenu handleMenuSelect={handleMenuSelect} chatListOpen={chatListOpen}/>
    </Sider >
  );
};

export default Aside;
