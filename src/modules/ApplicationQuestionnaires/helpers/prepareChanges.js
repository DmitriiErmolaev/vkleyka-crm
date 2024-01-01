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
