import React from "react";
import {Layout, Table, Tag} from "antd";

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

const ApplicationsTable = () => {

  return (
    <Layout >
      <Table dataSource={parsedJSON} columns={columns} sticky pagination={paginationConfig}/>;
    </Layout>
  )
}

export default ApplicationsTable;