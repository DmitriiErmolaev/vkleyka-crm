// const questionnairePath = "questionnary.answers"; // NOTE: для создания справочника путей

export const getPassportFieldsMatrix = () => {
  return [
    {
      fieldTitle: "Имя, латиницей",
      propWithValue: "first_name",
      valueType:'string',
    },
    {
      fieldTitle: "Фамилия, латиницей",
      propWithValue: "last_name",
      valueType:'string',
    },
    {
      fieldTitle: "Дата рождения",
      propWithValue: "date_of_birth",
      valueType:'date',
    },
    {
      fieldTitle: "Пол",
      propWithValue: "gender",
      valueType:'string',
    },
    {
      fieldTitle: "Гражданство",
      propWithValue: "citizenship",
      valueType:'string',
    },
    {
      fieldTitle: "Место рождения",
      propWithValue: "place_of_birth",
      valueType:'string',
    },
    {
      fieldTitle: "Номер паспорта",
      propWithValue: "passport_number",
      valueType:'string',
    },
    {
      fieldTitle: "Дата выдачи",
      propWithValue: "issue_date",
      valueType:'date',
    },
    {
      fieldTitle: "Орган, который выдал",
      propWithValue: "issued_by",
      valueType:'string',
    },
    {
      fieldTitle: "Действителен до",
      propWithValue: "valid_until",
      valueType:'date',
    },
    {
      fieldTitle: "ИИН",
      propWithValue: "IIN",
      valueType:'string',
    },
    {
      fieldTitle: 'Фото паспорта',
      propWithValue: 'image_url',
      valueType:'photo',
    }
  ]
}






