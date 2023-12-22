import React from "react";
import {Link} from "react-router-dom";
import {Tag} from "antd";
import {GLOBAL_ROLES, roleBasedContent} from "../role-based-rules";
import { testStatuses } from "../status/status";
import ChangeOperator from "../../components/application/ChangeOperator";

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
          to={`/application/${record.clientId}/${record.key}`}
          style={{ color:"#0EA5E9", fontWeight:"800" }}
          state={{ savedCountry: record.country, dialogue: record.dialogueSnap.data() }}
          onClick={() => {
            record.dialogueForApplication.current = record.dialogueSnap.data();
            record.setSelectedDialogue({dialogue: record.dialogueForApplication.current});
          }}
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

const phone_object = {
  role: all,
  config: {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
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
    dataIndex: 'countryFullName',
    key: 'countryFullName',
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
      const assignedTo = record.assignedTo;
      const clientApplicationsSnaps = record.appsCollSnapshot.docs.reduce((acc, docSnap) => {
        if (docSnap.get("UID") === record.clientId) {
          acc.push(docSnap);
          return acc;
        }
        return acc;
      }, [])
      return (
        <ChangeOperator 
          assignedTo={assignedTo}
          dialogueSnap={record.dialogueSnap}
          clientApplicationsSnaps={clientApplicationsSnaps}
          disabledProp={record.status === 2 ? true : false}
        />
        // <SelectComponent
        //   collectionType={"operators"}
        //   data={{
        //     assignedTo,
        //     dialogueSnap: record.dialogueSnap,
        //     clientApplicationsSnaps,
        //     disabledProp: record.status === 2 ? true : false,
        //   }}
        // />
      )
    }
  }
}
// массив общий для всех колонок, т.к. важен порядок в их отображении
const allObjects = [
  id_object,
  date_object,
  applicant_object,
  phone_object,
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
