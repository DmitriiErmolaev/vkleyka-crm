import React from "react";
import {Layout, Button, Table, Typography, Tag, Space} from "antd";

const {Header, Sider, Content} = Layout;

const primeLayoutStyle = {
  width:"100%", 
  maxWidth:"1280px",
  minHeight:"100vh",
  margin:"0 auto", 
  // backgroundColor:"white",
}

const headerStyle = {
  height:"81px", 
  boxShadow:"0 3px 6px 2px #0000002c",
  backgroundColor:"#F8F8F8", 
}

// const header = ["id", "date", "applicant", "status", "country", "viser"]

const parsedJSON = [
  {id:2,date:"26.05.2023",applicant:"Dmitriy Ermolaev",status:"новое",country:"США", viser:"Анастасия",},
  {id:1,date:"25.05.2023",applicant:"Alexander Pavlov",status:"завершено",country:"Германия", viser:"Екатерина"},
  {id:3,date:"22.05.2023",applicant:"Andrei Demidov",status:"в работе",country:"Авcтрия", viser:"Анастасия"},
  {id:4,date:"19.05.2023",applicant:"Andrei Demidov",status:"новое",country:"Папуа-Новая Гвинея", viser:"Павел"},
  {id:5,date:"17.05.2023",applicant:"Andrei Demidov",status:"завершено",country:"Шри-Ланка", viser:"Макар"},
  {id:6,date:"13.05.2023",applicant:"Andrei Demidov",status:"новое",country:"Шри Ланка", viser:"Яна"},
  {id:6,date:"13.05.2023",applicant:"Andrei Demidov",status:"отменено",country:"Шри Ланка", viser:"Яна"},
  {id:6,date:"13.05.2023",applicant:"Andrei Demidov",status:"в работе",country:"Шри Ланка", viser:"Яна"},
  {id:6,date:"13.05.2023",applicant:"Andrei Demidov",status:"в работе",country:"Шри Ланка", viser:"Яна"},


]

const createTag = (text) => {
  let tagColor="blue";
  switch(text) {
    case ("в работе"):
         tagColor = "yellow";
         break;
    case "завершено":
         tagColor = "green";
         break;
    case "отменено":
        tagColor = "red"
        break;
  }
  return <Tag bordered="false" color={tagColor}>{text}</Tag>
}
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: "center",
    sorter:(a, b) => {return a.id - b.id},
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: "center",
    sorter: (a,b) => {
      if(a.date > b.date){
        return 1;
      } else if (a.date < b.date) {
        return -1;
      } else {
        return 0;
      }
    }
    
  },
  {
    title: 'Applicant',
    dataIndex: 'applicant',
    key: 'applicant',
    align: "center",
    sorter: (a,b) => {
      const name1 = a.applicant.toLowerCase();
      const name2 = b.applicant.toLowerCase();
      if( name1 > name2) {
        return 1;
      } else if ( name1 < name2) {
        return -1;
      } else {
        return 0;
      }
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: "center",
    filters:[
      {
        text: "новое",
        value: "новое",
      },
      {
        text: "в работе",
        value: "в работе",
      },
      {
        text: "завершено",
        value: "завершено",
      },
    ],
    render: (text)=> {
      return createTag(text)
    },
    onFilter: (value, dataItem) => dataItem.status.includes(value),
    sorter: (a,b) => {
      let aNum;
      let bNum;
      if (a.status == "новое") {
        aNum = 1
      } else if (a.status == "в работе") {
        aNum = 2
      } else {
        aNum = 3
      }
      if (b.status == "новое") {
        bNum = 1
      } else if (b.status == "в работе") {
        bNum = 2
      } else {
        bNum = 3
      }
      return aNum - bNum;
    },
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    align: "center",
    sorter: (a,b) => {
      const name1 = a.country.toLowerCase();
      const name2 = b.country.toLowerCase();
      if( name1 > name2) {
        return 1;
      } else if ( name1 < name2) {
        return -1;
      } else {
        return 0;
      }
    }
  },
  {
    title: 'Viser',
    dataIndex: 'viser',
    key: 'viser',
    align: "center",
    sorter: (a,b) => {
      const name1 = a.viser.toLowerCase()
      const name2 = b.viser.toLowerCase()
      if (name1 > name2) {
        return 1;
      } else if (name1 < name2) {
        return -1;
      } else {
        return 0
      }
     
    }
  },
];

const paginationConfig = {
  position: ["topRight", "bottomRight"]
}

const ViserPage = () => {

  return (
    <div className="wrapper">
      <Layout className="primary-container" style={primeLayoutStyle}>
        <Header style={headerStyle}>
        </Header>
        <Layout hasSider>
          <Layout style={{width:"200px"}}>
            <Sider style={{height:"calc(100vh - 81px)", borderRadius:"0 20px 0 0", backgroundColor:"#767680", position:"fixed"}}>
                <p>Sider</p>
            </Sider>
          </Layout>
          <Content style={{width:"calc(100% - 200px)"}}>
            <Layout >
              <Table dataSource={parsedJSON} columns={columns} sticky pagination={paginationConfig}/>;
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default ViserPage;