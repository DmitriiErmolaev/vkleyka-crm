export const getCollapseItems = (questionnaireItems) => {
  const pairs = Object.entries(questionnaireItems)
  return pairs.map((section, index) => {
    return {
      key: index,
      label: section[0],
      children: section[1],
    }
  })
}
