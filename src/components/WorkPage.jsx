import React from "react";
import {Layout, Menu} from "antd";
import Head from "./Head";
import {Outlet, Link, useMatch} from "react-router-dom"

// const data = getDocs(collection(firestore, "applications"), )


const {Sider, Content} = Layout;

const primeLayoutStyle = {
  width:"100%", 
  minHeight:"100vh",
  margin:"0 auto", 
  background:"#F8F8F8 !important" ,
}

const roleBasedContent = {
  admin:{
    siderMenuItems: [
      {
        key:"all applications",
        label:(<Link to="/">Все заявки</Link>),
      },
      {
        key:"operators",
        label:(<Link to="users-manager">Acc Manage</Link>)
      }
    ]
  },
  operator:{
    siderMenuItems: [
      {
        key:"all applications",
        label:(<Link to="/">Все заявки</Link>),
      },
      {
        key:"chat",
        label:(<Link to="createOperator">Chat</Link>)
      }
    ]
  }
}

// const siderMenuItems = [
//   {key:"all applications",label:(<Link to="/">Все заявки</Link>),},
//   // {key:"start page",label:(<Link to="application">Тестовая заявка</Link>),},
// ]

const WorkPage = ()=> {
  // const [currentRouteRendered, setCurrentRouteRendered] = useState("all applications");
  const match = useMatch("/");
  const role = "admin";
  
  const getRouteRendered = () => {
    // отвечает за стилизацию выбранного пункта бокового меню 
    return match ? ["all applications"] : [null] 
  }

  return (
    <div className="wrapper">
      <Layout className="primary-container" style={primeLayoutStyle}>
        <Head />
        <Layout hasSider>
          <Sider 
            style={{
              zIndex:"1", 
              position:"fixed", 
              top:"81px", 
              borderRadius:"0 20px 0 0", 
              backgroundColor:"#767680", 
              height:"calc(200vh - 81px)"
            }}>
              <Menu 
                mode="inline" 
                theme="dark" 
                selectedKeys={getRouteRendered()} 
                items={roleBasedContent[role].siderMenuItems} 
                style={{backgroundColor:"transparent", color:"white", marginTop:"50px"}} 
              />
          </Sider>
          <Content style={{marginLeft:"200px", backgroundColor:"#F8F8F8"}}>
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default WorkPage;
