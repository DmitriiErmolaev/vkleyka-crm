export const getNewListWithAdded = (answersToUpdate, questionData, questionIndex) => {
    const editedAnswer = answersToUpdate.find(answer => answer.index === questionIndex)
    return editedAnswer ? [...editedAnswer.newResponse, ''] : [...questionData.response, ''];
}

export const getNewListWithRemoved = (answersToUpdate, questionData, questionIndex, itemIndex) => {
  const editedAnswer = answersToUpdate.find(answer => answer.index === questionIndex)
  return editedAnswer
    ? [...editedAnswer.newResponse.slice(0, itemIndex), ...editedAnswer.newResponse.slice(itemIndex + 1)]
    : [...questionData.response.slice(0, itemIndex), ...questionData.response.slice(itemIndex + 1)];
}

export const getNewListWithChangedValues = (answersToUpdate, questionData, questionIndex, itemIndex, newValue) => {
  const questionAlreadyChangedIndex = answersToUpdate.findIndex(question => {
    return question.index === questionIndex;
  })
  let newList = [];
  if (questionAlreadyChangedIndex === -1) {
    newList = [...questionData.response.slice(0,itemIndex), newValue, ...questionData.response.slice(itemIndex + 1)];
  } else {
    const alreadyChangedList = answersToUpdate[questionAlreadyChangedIndex].newResponse
    newList = [...alreadyChangedList.slice(0, itemIndex), newValue, ...alreadyChangedList.slice(itemIndex + 1) ];
  }
  return newList;
}

export const getArrayWithoutEmptyStrings = (array) => {
  return array.filter(elem => elem !== '')
}