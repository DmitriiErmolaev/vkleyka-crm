import { limit, query } from "firebase/firestore"

export const getQueryForAppsWithLimit = (ref, filters, pageCount) => {
  // Фильтры нельзя мутировать, т.к. в функции getQueryForAppsWithoutLimit фильтры не должны быть измененными
  // const constraints = lastDoc ? [...filters, startAfter(lastDoc)] : filters;
  return query(ref, ...filters, limit(5 * pageCount))
}
