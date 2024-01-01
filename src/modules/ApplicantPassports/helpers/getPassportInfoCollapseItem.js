export const getPassportInfoCollapseItem = (label, extra, children) => {
  // Collapse будет состоять только из 1 элемента. По этому только 1 объект.
  return [
    {
      key: "personalInfo",
      label: label,
      extra: extra, // TODO: вернуть, когда внедрю редактирование для passportsInfo
      children: children,
    }
  ]
}
