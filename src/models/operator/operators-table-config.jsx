import DeleteOperatorButtonContainer from '../../components/operator/DeleteOperatorButtonContainer';

const renderDeleteOperator = (_text, record, _index) => {
  return <DeleteOperatorButtonContainer id={record.id} name={record.name} />
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
    render: renderDeleteOperator,
  },
]
