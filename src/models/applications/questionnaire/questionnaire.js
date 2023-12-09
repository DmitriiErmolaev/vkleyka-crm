import { updateDoc } from "firebase/firestore";

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
