import { query } from "firebase/firestore"

export const getQueryForAppsWithoutLimit = (ref, filters) => {
  return query(ref, ...filters)
}
