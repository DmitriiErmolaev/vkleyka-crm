export const getNewListWithRemoved = (answersToUpdate, questionData, questionIndex, itemIndex) => {
  const editedAnswer = answersToUpdate.find(answer => answer.index === questionIndex)
  return editedAnswer
    ? [...editedAnswer.newResponse.slice(0, itemIndex), ...editedAnswer.newResponse.slice(itemIndex + 1)]
    : [...questionData.response.slice(0, itemIndex), ...questionData.response.slice(itemIndex + 1)];
}
