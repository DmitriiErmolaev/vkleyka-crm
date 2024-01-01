import { addZero } from "./addZero";
import { getShortYear } from "./getShortYear";

export const getApplicationCreationDate = (firebaseTimestamp) => {
  // TODO: проверить какую дату получают пользователи из других временных зон
  const date = firebaseTimestamp.toDate();
  const day = addZero(date.getDate());
  const correctMonth = addZero(date.getMonth() + 1);
  const shortYear = getShortYear(date.getFullYear());
  return `${day}/${correctMonth}/${shortYear}`;
}
