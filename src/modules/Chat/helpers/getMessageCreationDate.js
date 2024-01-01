import { addZero } from "../../../utils/addZero";
import { getShortYear } from "../../../utils/getShortYear";

export const getMessageCreationDate = (s) => {
  const date = new Date(s * 1000);
  const dd = `${addZero(date.getDate())}`;
  const mm = `${addZero(date.getMonth() + 1)}`;
  const yy = `${getShortYear(date.getFullYear())}`
  return `${dd}/${mm}/${yy}`;
}
