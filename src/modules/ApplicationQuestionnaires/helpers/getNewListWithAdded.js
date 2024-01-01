export const getNewListWithAdded = (answersToUpdate, questionData, questionIndex) => {
  const editedAnswer = answersToUpdate.find(answer => answer.index === questionIndex)
  return editedAnswer ? [...editedAnswer.newResponse, ''] : [...questionData.response, ''];
}
