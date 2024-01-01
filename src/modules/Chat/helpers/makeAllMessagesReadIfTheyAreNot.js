/**
 * Returns messages array with all read messages inside. Otherwise - returns false
 * @param {*} messages
 * @param {*} authorizedUser
 * @returns
 */
export const makeAllMessagesReadIfTheyAreNot = (messages) => {
  let notMyUnreadMessagesExist = false;
  const allReadMessages = messages.map(message => {
    if(message.readBy && !message.readBy.includes('operator')) {
      notMyUnreadMessagesExist = true;
      return {...message, readBy: [...message.readBy, 'operator']};
    }
    return message;
  })

  return notMyUnreadMessagesExist && allReadMessages;
}
