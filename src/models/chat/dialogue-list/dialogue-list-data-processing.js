import { where, query, orderBy } from "firebase/firestore";
import { getAppsCollRef } from "../../../firebase/applications/getAppsCollRef";
import { sklonenie } from "../../../utils";

export const getDialogueListFilters = (searchStr) => {
  let filters = [];
  if(searchStr){
    filters.push(where());
  }
}
