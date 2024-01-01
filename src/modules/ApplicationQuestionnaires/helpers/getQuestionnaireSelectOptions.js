export const getQuestionnaireSelectOptions = (options) => {
  return options.map((option, index) => {
    return {
      label: option.option,
      value: index,
    }
  })
}
