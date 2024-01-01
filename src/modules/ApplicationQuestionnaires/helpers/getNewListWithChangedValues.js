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
