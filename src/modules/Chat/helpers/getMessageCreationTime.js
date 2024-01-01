import { addZero } from "../../../utils/addZero";

export const getMessageCreationTime = (dateObject) => {
  // const date = timestamp.toDate(); // возвращает js Date object с потерей точности до секунд.
  const hh = addZero(dateObject.getHours());
  const mm = addZero(dateObject.getMinutes());
  return `${hh}:${mm}`
}
