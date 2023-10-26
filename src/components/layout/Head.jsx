import React from "react";
import { Layout, Menu, Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../../models/firebase";
import { Link } from "react-router-dom";
import HeadSearch from "./HeadSearch";
import '../../assets/header/head.scss';
const {Header} = Layout;

const topMenuItems = 
[
  {key:"notifications", label:(<a href="#">Уведомления</a>),},
  {key:"profile", label:(<Link to='/user-profile'>Профиль</Link>),},
]

const Head = ()=> {

  return (
    <Header 
      className='head'
    >
      <div className="head__logo" ></div>
      <div className='head__content'>
        <div className='apps-search-bar__container'>
          <HeadSearch />
        </div>
        <div>
          <Menu 
            theme="light" 
            style={{
              justifyContent: "center", 
              marginLeft: "auto"
            }} 
            items={topMenuItems} 
            mode="horizontal"
          />
        </div>
        <Button type="primary" onClick={() => signOut(auth)}>Выйти</Button>
      </div>
    </Header>
  )
}

export default Head;
