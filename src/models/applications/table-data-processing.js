import {limit, startAfter, where} from "firebase/firestore";
import { updateDoc, orderBy } from "firebase/firestore";
import { addZero } from "../../utils";
import { getShortYear } from "../../utils";
import { getDialogueSnap } from "../chat/chat-data-processing";
import { getCountry, getFullCountryName } from "../countries/countries";

// ====== Получают данные для отображение в таблице ======


export const getUserPersonalInfo = (users, uid) => {
  return users.find(user => {
    return user.UID === uid
  })
}

export const getUserName = (users, uid) => {
  const user = getUserPersonalInfo(users, uid)
  return user.name
}





export const resetBeforeDownloadFilteredData = (lastDoc, setLastDoc, setTableData) => {
  setTableData([])
  if(lastDoc) setLastDoc(null); // обязательно стираем сохраненный последний документ, если заявки подгружались.
}