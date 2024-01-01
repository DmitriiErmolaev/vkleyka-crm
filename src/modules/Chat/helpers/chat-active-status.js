export const chatCurrentStatus = {
  inProgress: 'В работе',
  finished: 'Завершен',
}

export const dialogueActions = {
  finish: {
    value: 'finish',
    label:'Завершить',
  },
  takeInpRogress: {
    value: 'take in progress',
    label: 'Взять',
  }
}

export const chatActiveStatusActionOptions = {
  finish: [
    {
      value: dialogueActions.finish.value,
      label: dialogueActions.finish.label,
    },
  ],
  takeInProgress: [
    {
      value: dialogueActions.takeInpRogress.value,
      label: dialogueActions.takeInpRogress.label,
    },
  ]
}
