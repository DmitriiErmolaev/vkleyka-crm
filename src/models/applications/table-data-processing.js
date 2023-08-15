import {where} from "firebase/firestore";
import { updateDoc,orderBy } from "firebase/firestore";
import { addZero } from "../../utils";
import { getShortYear } from "../../utils";
import { getDialogueRef } from "../chat/chat-data-processing";

// ====== Получают данные для отображение в таблице ======
export const getApplicationId = (docId) => {
  let id = docId.slice(0,4).toUpperCase();
  return id
}

export const getApplicationCreationDate = (firebaseTimestamp) => {
  // TODO: проверить какую дату получают пользователи из других временных зон
  const date = firebaseTimestamp.toDate();
  const day = addZero(date.getDate());
  const correctMonth = addZero(date.getMonth() + 1);
  const shortYear = getShortYear(date.getFullYear());
  return `${day}/${correctMonth}/${shortYear}`;
}

export const getUserPersonalInfo = (users, uid) => {
  return users.find(user => {
    return user.UID === uid
  })
}

export const getUserName = (users, uid) => {
  const user = getUserPersonalInfo(users, uid)
  return user.name
}

export const getFullCountryName = (countries, countryCode) => {
  const findedCountry = countries.find(country => {
    return countryCode === country.country_code;
  })
  return findedCountry.name_ru
}

export const getDataForTable = (applications, applicants, countries, chatsCollSnapshot) => {
  console.log(chatsCollSnapshot)
  return applications.reduce((accum, application) => {
    accum.push(
      {
        key: application.documentID,
        id: getApplicationId(application.documentID),
        date: getApplicationCreationDate(application.createdAt),
        // dialogueRef: getDialogueRef(chatsCollSnapshot, application.UID),
        applicant: `${application.passports[0].first_name} ${application.passports[0].last_name}`,
        status: application.preparedInformation.preparationStatus,
        country: getFullCountryName(countries, application.country_code),
        assignedTo: application.preparedInformation.assignedTo,
      }
    )
    return accum;
  }, [])
}

export const getFilters = (country, status, column, authorizedOperator) => {
  let filters = [
    where('paymentSuccessful', '==', true),
    orderBy("createdAt", "desc"),
  ];
  
  if (authorizedOperator.role === 'operator') {
    filters.push(where("preparedInformation.assignedTo", "==", authorizedOperator.id));
  }

  /*=====!!!!!! ФИЛЬТРЫ. НЕ УДАЛЯТЬ!!!!!!! ========*/

  // if(selectedColumn && selectedColumn.order) {
  //   filters.push(orderBy(selectedColumn.column, selectedColumn.order))
  // } else {
  //   filters.push(orderBy("date", "desc"))
  // }
  if(country.value) {
    filters.push(where("country_code", "==", country.value));
  }
  if((status && status !== "allStatuses") || status === 0) {
    filters.push(where("preparedInformation.preparationStatus", "==", status))
  }
  return filters;
}
