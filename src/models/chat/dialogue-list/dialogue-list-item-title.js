import { getMessageCreationTime } from "../../../modules/Chat/helpers/getMessageCreationTime";

export const getlastMessageTime = (timestamp) => {
  return getMessageCreationTime(timestamp.toDate());
}