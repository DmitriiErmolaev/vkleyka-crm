import React from "react";
import {Link} from "react-router-dom";
import {Tag} from "antd";
import SelectComponent from "./components/selectors/SelectComponent";

const roles = {
  admin: "admin",
  operator: "operator",
  all: "all"
}

const appStatus = {
  new: "Новые",
  inWork: "В работе",
  finished: "Завершенные",
  cancelled: "Отмененные",
}

const createTag = (text) => {
  let tagColor;

  switch(text) {
    case (appStatus.inWork):
      tagColor = "yellow";
      break;
    case (appStatus.finished):
      tagColor = "green";
      break;
    case (appStatus.cancelled):
      tagColor = "red"
      break;
    default:
      tagColor = "blue"
  }

  return <Tag bordered="false" color={tagColor}>{text}</Tag>
}

const id_object = {
  role: "all",
  config: {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: "center",
    render: (text, record, index) => {
      return <Link to={`/application/${text}`} state={{id:text}} style={{color:"#0EA5E9", fontWeight:"800"}}>{text}</Link>
    }
  }
}
const data_object = {
  role: "all",
  config: {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: "center",
    sorter: true,
  }
  
}
const applicant_object = {
  role: "all",
  config: {
    title: 'Applicant',
    dataIndex: 'applicant',
    key: 'applicant',
    align: "center",
    sorter:true,
  }
 
}

const status_object = {
  role: "all",
  config: {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: "center",
    render: (text)=> {
      return createTag(text)
    },
  }
  
}

const country_object = {
  role: "all",
  config: {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    align: "center",
  }
  
}

const viser_object = {
  role: "admin",
  config: {
    title: 'Viser',
    dataIndex: 'viser',
    key: 'viser',
    align: "center",
    sorter: true,
    render: (text,record,index) => {
        return <SelectComponent collectionType={"operators"} data={record}/> 
    }
  }
  
}
// массив общий для всех колонок, т.к. важен порядок в их отображении 
const allObjects = [
  id_object,
  data_object,
  applicant_object,
  status_object, 
  country_object,
  viser_object,
]

// в перспективе ролей будет больше, поэтому проверка на каждую роль отдельно
const getOperatorColumnsConfig = () => {
  return allObjects.reduce((acc, colConfig) => {
    if(colConfig.role === roles.all || colConfig.role === roles.operator) {
      acc.push(colConfig.config)
      return acc
    }
    return acc
  }, [])
}

const getAdminColumnsConfig = () => {
  return allObjects.reduce((acc, colConfig) => {
    if(colConfig.role === roles.all || colConfig.role === roles.admin) {
      acc.push(colConfig.config);
      return acc
    }
    return acc
  }, [])
}


// const columns = [
//   {
//     title: 'ID',
//     dataIndex: 'id',
//     key: 'id',
//     align: "center",
//     render: (text, record, index) => {
//       return <Link to={`/application/${text}`} state={{id:text}} style={{color:"#0EA5E9", fontWeight:"800"}}>{text}</Link>
//     }
//   },
//   {
//     title: 'Date',
//     dataIndex: 'date',
//     key: 'date',
//     align: "center",
//     sorter: true,
//   },
//   {
//     title: 'Applicant',
//     dataIndex: 'applicant',
//     key: 'applicant',
//     align: "center",
//     sorter:true,
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//     align: "center",
//     render: (text)=> {
//       return createTag(text)
//     },
//   },
//   {
//     title: 'Country',
//     dataIndex: 'country',
//     key: 'country',
//     align: "center",
    
//   },
//   {
//     title: 'Viser',
//     dataIndex: 'viser',
//     key: 'viser',
//     align: "center",
//     sorter: true,
//     render: (text,record,index) => {
//         return <SelectComponent collectionType={"operators"} data={record}/> 
//     }
//   },
// ];



export {getOperatorColumnsConfig, getAdminColumnsConfig, appStatus}
