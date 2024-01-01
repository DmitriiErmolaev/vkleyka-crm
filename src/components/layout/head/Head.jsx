import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu, Button, ConfigProvider } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeadSearch from "./HeadSearch";
import '../../../assets/header/head.scss';
import { ReactComponent as Logo } from '../../../assets/icons/logo.svg';
import HeadMenu from "./HeadMenu";
import { topMenuItems } from "../../../models/head-menu/head-menu";
import { theme } from "antd";
import { WorkPageContext } from "../../../models/context";
const { useToken } = theme;
const { Header } = Layout;



const Head = ()=> {
  const navigate = useNavigate();
  const { token } = useToken();
  const { dialogueForApplication, selectedDialogue, setSelectedDialogue } = useContext(WorkPageContext);


  const handleLogoClick = () => {
    navigate('/')
    if (dialogueForApplication?.current) {
      if (dialogueForApplication.current.UID === selectedDialogue.dialogue.UID) {
        setSelectedDialogue(null);
      }
      dialogueForApplication.current = null;
    }
  }

  return (
    <ConfigProvider
      theme={{
        components:{
          Layout: {
            headerBg: token.colorBgLayout
          }
        }
      }}
    >
      <Header
        className='head'
      >
        <div className="logo__container">
          <Logo
            className='logo'
            onClick={handleLogoClick}
          />
        </div>
        <div className='head__content'>
          <div className='apps-search-bar__container'>
            <HeadSearch />
          </div>
          <HeadMenu />
        </div>
      </Header>
    </ConfigProvider>
  )
}

export default Head;
