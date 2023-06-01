import React from "react";
import {Layout, Menu} from "antd";
const {Header} = Layout;

const headerContainerStyle = 
{
  position:"sticky",
  top:"0",
  zIndex: "1",
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
  {key:"profile", label:(<a href="#">профиль</a>),},
]

const Head = ({handleClick, currentPage})=> {
  return (
    <div style={headerContainerStyle}>
      <Header style={headerStyle} >
        <div className="logo" style={{width:"150px", height:"100%"}}></div>
        <Menu style={{backgroundColor:"#F8F8F8", width:"20%" ,borderBottom:"none", marginLeft: "auto"}} items={topMenuItems} mode="horizontal" selectedKeys={[currentPage]} onClick={(e)=> handleClick(e)}/>
      </Header>
    </div>
  )
}

export default Head;