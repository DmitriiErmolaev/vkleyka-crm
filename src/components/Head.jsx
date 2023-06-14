import React from "react";
import {Layout, Menu, Row, Col, Button} from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";
const {Header} = Layout;

const headerContainerStyle = 
{
  position:"sticky",
  top:"0",
  zIndex: "2",
  width:"100%",
  height:"101px",
  paddingBottom:"20px",
  overflow: "hidden",
  backgroundColor:"#F8F8F8 !important" , 
}
const headerStyle = 
{
  display:"flex",
  flexDirection:"row",
  height:"100%", 
  boxShadow:"0 3px 6px 2px #0000002c",
  backgroundColor:"#F8F8F8",
}

const topMenuItems = 
[
  {key:"notifications", label:(<a href="#">Уведомления</a>),},
  {key:"profile", label:(<a href="#">Профиль</a>),},
]

const Head = ({})=> {
  return (
    <div style={headerContainerStyle}>
      <Header style={headerStyle} >
        <div className="logo" style={{width:"150px", height:"100%"}}></div>
        <Row justify="end" style={{width:"calc(100% - 150px)"}}>
          {/* <Col span={12}></Col> */}
          <Col span={8} >
            <Menu style={{backgroundColor:"#F8F8F8", justifyContent:"center", borderBottom:"none", marginLeft: "auto"}} items={topMenuItems} mode="horizontal"/>
          </Col>
          <Col span={2} >
            <Button type="primary" onClick={() => signOut(auth) }>Выйти</Button>
          </Col>
        </Row>
      </Header>
    </div>
  )
}

export default Head;