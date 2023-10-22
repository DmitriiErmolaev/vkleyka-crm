import React from "react";
import {Layout, Menu, Row, Col, Button} from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../../models/firebase";
import { Link } from "react-router-dom";
const {Header} = Layout;

const headerStyle = 
{
  position:'fixed',
  top:'0',
  left:'0',
  zIndex:'100',
  width:'100%',
  display:"flex",
  backgroundColor:"#fff",
}

const topMenuItems = 
[
  {key:"notifications", label:(<a href="#">Уведомления</a>),},
  {key:"profile", label:(<Link to='/user-profile'>Профиль</Link>),},
]

const Head = ()=> {
  return (
    <Header 
      style={headerStyle} 
    >
      <div className="logo" style={{width:"150px", height:"100%"}}></div>
      <Row justify="end" style={{width:"calc(100% - 150px)"}}>
        <Col span={8} >
          <Menu 
            theme="light" 
            style={{
              justifyContent:"center", 
              marginLeft: "auto"
            }} 
            items={topMenuItems} 
            mode="horizontal"
          />
        </Col>
        <Col span={1} style={{}}>
          <Button type="primary" onClick={() => signOut(auth)}>Выйти</Button>
        </Col>
      </Row>
    </Header>
  )
}

export default Head;
