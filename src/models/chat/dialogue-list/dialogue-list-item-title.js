import { getMessageCreationTime } from "../message";

export const getlastMessageTime = (timestamp) => {
  return getMessageCreationTime(timestamp.toDate());
}