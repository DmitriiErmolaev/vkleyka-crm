import { updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

// const questionnairePath = "questionnary.answers"; // NOTE: для создания справочника путей

export const prepareChanges = (changedFields, newResponse, questionIndex, nestedOptions = {isNested: false}) => {
  if(changedFields.length === 0) {
    // TODO: Добавить поле об обязательности заполнения. Из newResponse наверно.
    return [{index: questionIndex, newResponse: newResponse}]
  }

  const changedAnswerIndex = changedFields.findIndex((elem) => {
    return elem.index === questionIndex;
  })

  if(changedAnswerIndex === -1) {
    return [...changedFields,{index: questionIndex, newResponse: newResponse}];
  } else {
    const copyChangedFields = [...changedFields];
    if(nestedOptions.isNested) {
      copyChangedFields[changedAnswerIndex].newResponse.answers[nestedOptions.nestedQuestionIndex].answer = newResponse // для вложенных текстовых ответов
    } else {
      copyChangedFields[changedAnswerIndex].newResponse = newResponse;
    }
    return copyChangedFields;
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

export const getPassportInfoQuestions = () => {
  return [
    {
      key:nanoid(),
      questionTitle: "Имя, латиницей",
      propWithAnswer: "first_name",
    },
    {
      key:nanoid(),
      questionTitle: "Фамилия, латиницей",
      propWithAnswer: "last_name",
    },
    {
      key:nanoid(),
      questionTitle: "Дата рождения",
      propWithAnswer: "date_of_birth",
    },
    {
      key:nanoid(),
      questionTitle: "Пол",
      propWithAnswer: "gender",
    },
    {
      key:nanoid(),
      questionTitle: "Гражданство",
      propWithAnswer: "citizenship",
    },
    {
      key:nanoid(),
      questionTitle: "Место рождения",
      propWithAnswer: "place_of_birth",
    },
    {
      key:nanoid(),
      questionTitle: "Номер паспорта",
      propWithAnswer: "passport_number",
    },
    {
      key:nanoid(),
      questionTitle: "Дата выдачи",
      propWithAnswer: "issue_date",
    },
    {
      key:nanoid(),
      questionTitle: "Орган, который выдал",
      propWithAnswer: "issued_by",
    },
    {
      key:nanoid(),
      questionTitle: "Действителен до",
      propWithAnswer: "valid_until",
    },
    {
      key:nanoid(),
      questionTitle: "ИИН",
      propWithAnswer: "IIN",
    },
  ]
}


export const getPassportsInfoCollapseItem = (label, extra, children) => {
  return {
    key: "personalInfo",
    label: label,
    // extra: extra, // TODO: вернуть, когда внедрю редактирование для passportsInfo
    // style: panelStyle, // NOTE: для стилизации. Пока не убирать
    children: children,
  }
}

export const getCollapseItems = (questionnaireItems) => {
  const pairs = Object.entries(questionnaireItems)
  return pairs.map((section, index) => {
    return {
      key: index,
      label: section[0],
      // style: panelStyle,  // NOTE: для стилизации. Пока не убирать
      children: section[1],
    }
  })
}
