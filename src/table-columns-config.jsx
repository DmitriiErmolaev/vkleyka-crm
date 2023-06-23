import React from "react";
import {Link} from "react-router-dom";
import {Tag} from "antd";
import SelectComponent from "./components/selectors/SelectComponent";

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

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: "center",
    // sorter:(a, b) => {return a.id - b.id},
    render: (text, record, index) => {
      return <Link to={`/application/${text}`} state={{id:text}} style={{color:"#0EA5E9", fontWeight:"800"}}>{text}</Link>
    }
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: "center",
    sorter: true,
    // sortIcon: ({sortOrder}) => ReactNode
    // defaultSortOrder:"descend",
    // sorter: (a,b) => {
    //   if(a.date > b.date){
    //     return 1;
    //   } else if (a.date < b.date) {
    //     return -1;
    //   } else {
    //     return 0;
    //   }
    // }
  },
  {
    title: 'Applicant',
    dataIndex: 'applicant',
    key: 'applicant',
    align: "center",
    sorter:true,
    // sorter: (a,b) => {
    //   const name1 = a.applicant.toLowerCase();
    //   const name2 = b.applicant.toLowerCase();
    //   if( name1 > name2) {
    //     return 1;
    //   } else if ( name1 < name2) {
    //     return -1;
    //   } else {
    //     return 0;
    //   }
    // }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: "center",
    render: (text)=> {
      return createTag(text)
    },
    // onFilter: (value, dataItem) => dataItem.status.includes(value),
    // sorter:true,
    // sorter: (a,b) => {
    //   let aNum;
    //   let bNum;
    //   if (a.status == "новое") {
    //     aNum = 1
    //   } else if (a.status == "в работе") {
    //     aNum = 2
    //   } else {
    //     aNum = 3
    //   }
    //   if (b.status == "новое") {
    //     bNum = 1
    //   } else if (b.status == "в работе") {
    //     bNum = 2
    //   } else {
    //     bNum = 3
    //   }
    //   return aNum - bNum;
    // },
    // filters:[
    //   {
    //     text: "новое",
    //     value: "новое",
    //   },
    //   {
    //     text: "в работе",
    //     value: "в работе",
    //   },
    //   {
    //     text: "завершено",
    //     value: "завершено",
    //   },
    //   {
    //     text: "отменено",
    //     value: "отменено",
    //   },
    // ],
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    align: "center",
    // sorter: (a,b) => {
    //   const name1 = a.country.toLowerCase();
    //   const name2 = b.country.toLowerCase();
    //   if( name1 > name2) {
    //     return 1;
    //   } else if ( name1 < name2) {
    //     return -1;
    //   } else {
    //     return 0;
    //   }
    // }
  },
  {
    title: 'Viser',
    dataIndex: 'viser',
    key: 'viser',
    align: "center",
    sorter: true,
    render: (text,record,index) => {
        return <SelectComponent collectionType={"operators"} data={record}/> 
    }
  },
];



export {columns, appStatus}
