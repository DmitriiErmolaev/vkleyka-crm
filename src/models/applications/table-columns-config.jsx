import React from "react";
import {Link} from "react-router-dom";
import {Tag} from "antd";
import SelectComponent from "../../components/selectors/SelectComponent";
import {GLOBAL_ROLES, roleBasedContent} from "../role-based-rules";
import { getAppRefById } from "./applications";
import { testStatuses } from "../status/status";

const admin = GLOBAL_ROLES.admin;
const all = "all";

const createTag = (status) => {
  return <Tag bordered="false" color={testStatuses[status].tagColor}>{testStatuses[status].tagText}</Tag>;
}

const id_object = {
  role: all,
  config: {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: "center",
    render: (text, record, _) => {
      return (
        <Link 
          to={`/application/${record.key}`} 
          style={{color:"#0EA5E9", fontWeight:"800"}}
        >
          {text}
        </Link>
      )
    },
  }
}

const date_object = {
  role: all,
  config: {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: "center",
  }
}

const applicant_object = {
  role: all,
  config: {
    title: 'Applicant',
    dataIndex: 'applicant',
    key: 'applicant',
    align: "center",
  }
}

const status_object = {
  role: all,
  config: {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: "center",
    render: (status)=> {
      return createTag(status)
    },
  }
}

const country_object = {
  role: all,
  config: {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    align: "center",
  }
}

const viser_object = {
  role: admin,
  config: {
    title: 'Viser',
    dataIndex: 'assignedTo',
    key: 'assignedTo',
    align: "center",
    render: (_test, record, _index) => {
      console.log(record)
        const ref = getAppRefById(record.key);
        const assignedTo = record.assignedTo;
        return <SelectComponent collectionType={"operators"} data={{ref, assignedTo, dialogueRef:record.dialogueRef }}/> 
    }
  }
}
// массив общий для всех колонок, т.к. важен порядок в их отображении 
const allObjects = [
  id_object,
  date_object,
  applicant_object,
  status_object, 
  country_object,
  viser_object,
]
// обходит массив всех колонок таблицы, забирая только соответствующие роли пользователя колонки.
export const getColumnsConfig = (role) => {
  return allObjects.reduce((accum, colConfig) => {
    if(roleBasedContent[role].columnsIncluded.includes(colConfig.role)) {
      accum.push(colConfig.config)
      return accum
    }
    return accum
  }, [])
}
