import { updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import PassportImg from "../../../components/questionnaire/applicationPassportInfo/PassportImg";
import dayjs from "dayjs";

// const questionnairePath = "questionnary.answers"; // NOTE: для создания справочника путей

export const prepareChanges = (changedFields, newResponse, questionIndex, nestedOptions = {isNested: false}) => {
  if(changedFields.length === 0) {
    // TODO: Добавить поле об обязательности заполнения. Из newResponse наверно.
    return [{newResponse: newResponse, index: questionIndex,}]
  }

  const changedAnswerIndex = changedFields.findIndex((elem) => {
    return elem.index === questionIndex;
  })

  if(changedAnswerIndex === -1) {
    return [...changedFields, {newResponse: newResponse, index: questionIndex,}];
  } else {
    const changedFieldsCopy = [...changedFields];
    if(nestedOptions.isNested) {
      changedFieldsCopy[changedAnswerIndex].newResponse.answers[nestedOptions.nestedQuestionIndex].answer = newResponse // для вложенных текстовых ответов
    } else {
      changedFieldsCopy[changedAnswerIndex].newResponse = newResponse;
    }
    return changedFieldsCopy;
  }
}

export const getChangedValue = (answersToUpdate, quesionIndex, nestedOptions) => {
  if(answersToUpdate.length === 0) {
    return false
  }
  const alreadyChangedValue = answersToUpdate.find((elem) => {
    return elem.index === quesionIndex;
  })

  if (alreadyChangedValue && nestedOptions?.isNested) {
    return alreadyChangedValue.newResponse.answers[nestedOptions.nestedQuestionIndex].answer
  } else if (alreadyChangedValue) {
    return alreadyChangedValue.newResponse;
  } else {
    return false;
  }
}

const createChangedQuestionnaireCopy = (questionnaireOriginal, answersToUpdate) => {
  let copyQuestionnaire = [...questionnaireOriginal];
  answersToUpdate.forEach((question) => {
    copyQuestionnaire[question.index].response = question.newResponse
  })
  return copyQuestionnaire;
}

export const updateQuestionnaireAnswers = async (ref, questionnaireOriginal, answersToUpdate) => {
  const copy = createChangedQuestionnaireCopy(questionnaireOriginal, answersToUpdate)
  await updateDoc(ref,"questionnary.answers", copy )
}

export const getQuestionnaireSelectOptions = (options) => {
  return options.map((option, index) => {
    return {
      label: option.option,
      value: index,
    }
  })
}

export const getPassportFieldsMatrix = () => {
  return [
    {
      key:nanoid(),
      fieldTitle: "Имя, латиницей",
      propWithValue: "first_name",
      valueType:'string',
    },
    {
      key:nanoid(),
      fieldTitle: "Фамилия, латиницей",
      propWithValue: "last_name",
      valueType:'string',
    },
    {
      key:nanoid(),
      fieldTitle: "Дата рождения",
      propWithValue: "date_of_birth",
      valueType:'date',
    },
    {
      key:nanoid(),
      fieldTitle: "Пол",
      propWithValue: "gender",
      valueType:'string',
    },
    {
      key:nanoid(),
      fieldTitle: "Гражданство",
      propWithValue: "citizenship",
      valueType:'string',
    },
    {
      key:nanoid(),
      fieldTitle: "Место рождения",
      propWithValue: "place_of_birth",
      valueType:'string',
    },
    {
      key:nanoid(),
      fieldTitle: "Номер паспорта",
      propWithValue: "passport_number",
      valueType:'string',
    },
    {
      key:nanoid(),
      fieldTitle: "Дата выдачи",
      propWithValue: "issue_date",
      valueType:'date',
    },
    {
      key:nanoid(),
      fieldTitle: "Орган, который выдал",
      propWithValue: "issued_by",
      valueType:'string',
    },
    {
      key:nanoid(),
      fieldTitle: "Действителен до",
      propWithValue: "valid_until",
      valueType:'date',
    },
    {
      key:nanoid(),
      fieldTitle: "ИИН",
      propWithValue: "IIN",
      valueType:'string',
    },
    {
      key:nanoid(),
      fieldTitle: 'Фото паспорта',
      propWithValue: 'image_url',
      valueType:'photo',
    }
  ]
}

export const getPassportInfoCollapseItem = (label, extra, children) => {
  // Collapse будет состоять только из 1 элемента. По этому только 1 объект.
  return [
    {
      key: "personalInfo",
      label: label,
      extra: extra, // TODO: вернуть, когда внедрю редактирование для passportsInfo
      children: children,
    }
  ]
}

export const getPassportInfoValue = (passportField, value, isEdit) => {
  if(!value) return '';
  if(passportField.valueType === 'date') {
    // TODO: временное решение. Удалить когда все даты в паспортной части будут таймштампами а не текстом
    if (typeof value === 'string') return value;
    return dayjs.unix(value.seconds).format('DD.MM.YYYY');
  }
  if(passportField.valueType === 'photo') {
    return <PassportImg path={value}/>
  }
  return value;
}

export const getCollapseItems = (questionnaireItems) => {
  const pairs = Object.entries(questionnaireItems)
  return pairs.map((section, index) => {
    return {
      key: index,
      label: section[0],
      children: section[1],
    }
  })
}
