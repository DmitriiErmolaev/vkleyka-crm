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

export const getPassportInfoQuestions = () => {
  return [
    {
      key:nanoid(),
      questionTitle: "Имя, латиницей",
      propWithAnswer: "first_name",
      answerType:'string',
    },
    {
      key:nanoid(),
      questionTitle: "Фамилия, латиницей",
      propWithAnswer: "last_name",
      answerType:'string',
    },
    {
      key:nanoid(),
      questionTitle: "Дата рождения",
      propWithAnswer: "date_of_birth",
      answerType:'date',
    },
    {
      key:nanoid(),
      questionTitle: "Пол",
      propWithAnswer: "gender",
      answerType:'string',
    },
    {
      key:nanoid(),
      questionTitle: "Гражданство",
      propWithAnswer: "citizenship",
      answerType:'string',
    },
    {
      key:nanoid(),
      questionTitle: "Место рождения",
      propWithAnswer: "place_of_birth",
      answerType:'string',
    },
    {
      key:nanoid(),
      questionTitle: "Номер паспорта",
      propWithAnswer: "passport_number",
      answerType:'string',
    },
    {
      key:nanoid(),
      questionTitle: "Дата выдачи",
      propWithAnswer: "issue_date",
      answerType:'date',
    },
    {
      key:nanoid(),
      questionTitle: "Орган, который выдал",
      propWithAnswer: "issued_by",
      answerType:'string',
    },
    {
      key:nanoid(),
      questionTitle: "Действителен до",
      propWithAnswer: "valid_until",
      answerType:'date',
    },
    {
      key:nanoid(),
      questionTitle: "ИИН",
      propWithAnswer: "IIN",
      answerType:'string',
    },
    {
      key:nanoid(),
      questionTitle: 'Фото паспорта',
      propWithAnswer: 'image_url',
      answerType:'photo',
    }
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

export const getPassportInfoValue = (question, value) => {
  if(!value) return '';
  if(question.answerType === 'date') {
    // TODO: временное решение. Удалить когда все даты в паспортной части будут таймштампами а не текстом
    if (typeof value === 'string') return value;
    return dayjs.unix(value.seconds).format('DD.MM.YYYY');
  }
  if(question.answerType === 'photo') {
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
      // style: panelStyle,  // NOTE: для стилизации. Пока не убирать
      children: section[1],
    }
  })
}
