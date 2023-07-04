import React from "react";
import {Layout, Menu, Row, Col, Button} from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../../models/firebase";
const {Header} = Layout;

const headerStyle = 
{
  display:"flex",
  backgroundColor:"#fff",
}

const topMenuItems = 
[
  {key:"notifications", label:(<a href="#">Уведомления</a>),},
  {key:"profile", label:(<a href="#">Профиль</a>),},
]

const Head = ({})=> {
  return (
      <Header 
        style={headerStyle} 
      >
        <div className="logo" style={{width:"150px", height:"100%"}}></div>
        <Row justify="end" style={{width:"calc(100% - 150px)"}}>
          {/* <Col span={12}></Col> */}
          <Col span={8} >
            <Menu 
              theme="light" 
              style={{
                // backgroundColor:"#F8F8F8", 
                justifyContent:"center", 
                // borderBottom:"none", 
                marginLeft: "auto"
              }} 
              items={topMenuItems} 
              mode="horizontal"
            />
          </Col>
          <Col span={1} style={{}}>
            <Button type="primary" onClick={() => signOut(auth) }>Выйти</Button>
          </Col>
        </Row>
      </Header>
  )
}

export default Head;
