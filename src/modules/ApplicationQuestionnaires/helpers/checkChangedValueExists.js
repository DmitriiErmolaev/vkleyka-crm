export const checkChangedValueExists = (answersToUpdate, quesionIndex, nestedOptions) => {
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
