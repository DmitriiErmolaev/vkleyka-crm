import {DeleteOutlined } from "@ant-design/icons";

const renderTrashCan = () => {
  return <DeleteOutlined />
} 

export const columns = [
  {
    key: "operatorName",
    dataIndex: "operatorName",
    title: "Имя, Фамилия",
  },
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
  },
  {
    key: "phoneNumber",
    dataIndex: "phoneNumber",
    title: "Телефон",
  },
  {
    key: "appCompleted",
    dataIndex: "appCompleted",
    title: "Обработанные беседы",
  },
  {
    key: "delete",
    render: renderTrashCan,
  },
]
