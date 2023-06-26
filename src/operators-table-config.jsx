import DeleteOperator from "./components/DeleteOperator";



const renderTrashCan = (text, record, index) => {
  return < DeleteOperator index={index}/>
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
