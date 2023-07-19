import { updateDoc } from "firebase/firestore";

const questionnairePath = "questionnary.answers";

export const prepareChanges = (changedFields, newValue, questionIndex) => {
  if(changedFields.length === 0) {
    return [{index: questionIndex, value: newValue}]
  }

  const changedAnswerIndex = changedFields.findIndex((elem) => {
    return elem.index === questionIndex;
  })

  if(changedAnswerIndex === -1) {
    return [...changedFields,{index: questionIndex, value: newValue}];
  } else {
    return changedFields.map((elem, index) => {
      if(index === changedAnswerIndex){
        return {...elem, value: newValue};
      }
      return elem;
    })
  }
}

export const getChangedValue = (answersToUpdate, quesionIndex) => {
  const alreadyChangedValueIndex = answersToUpdate.find((elem) => {
    return elem.index === quesionIndex;
  })

  if (!alreadyChangedValueIndex) {
    return false;
  } 

  return alreadyChangedValueIndex.value
}

const createChangedQuestionnaireCopy = (questionnaireOriginal, answersToUpdate) => {
  let copyQuestionnaire = [...questionnaireOriginal];
  answersToUpdate.forEach((question) => {
    copyQuestionnaire[question.index].response = question.value
  })
  return copyQuestionnaire;
}

export const updateQuestionnaireAnswers = async (ref, questionnaireOriginal, answersToUpdate) => {
  const copy = createChangedQuestionnaireCopy(questionnaireOriginal, answersToUpdate)
  await updateDoc(ref,"questionnary.answers", copy )
}

export const getQuestionnarieSelectOptions = () => {
  return [
    
  ]
}

export const getQuestionnaireSelectOptions = (response) => {
  return [
    {
      label: response.pickedOptionName,
      value: response.pickedOption,
    }
  ]
}