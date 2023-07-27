import DeleteOperator from "../../components/operator/DeleteOperator";
const renderTrashCan = (_text, record, _index) => {
  return <DeleteOperator id={record.id} />
} 

export const columns = [
  {
    key: "operatorName",
    dataIndex: "name",
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
    key: "appsNew",
    dataIndex: "appsNew",
    title: "Новые",
  },
  {
    key: "appsInProgress",
    dataIndex: "appsInProgress",
    title: "В процессе",
  },
  {
    key: "appsFinished",
    dataIndex: "appsFinished",
    title: "Завершенные",
  },
  {
    key: "delete",
    render: renderTrashCan,
  },
]
