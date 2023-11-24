import {limit, startAfter, where} from "firebase/firestore";
import { updateDoc, orderBy } from "firebase/firestore";
import { addZero } from "../../utils";
import { getShortYear } from "../../utils";
import { getDialogueSnap } from "../chat/chat-data-processing";
import { getCountry, getFullCountryName } from "../countries/countries";

// ====== Получают данные для отображение в таблице ======
export const getShortApplicationId = (docId) => {
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



export const getDataForTable = (applications, countries, chatsCollSnapshot, appsCollSnapshot ) => {
  return applications.reduce((accum, application) => {
    // if (application.UID === 'VFsLjgXQNMS5PAF3INqwO1ET3sB3') {
    //   return accum // TODO: обход бага. Решить с Жангиром
    // }
    const country = getCountry(countries, application.country_code);
    accum.push(
      {
        key: application.documentID,
        clientId: application.UID,
        country: country,
        appsCollSnapshot: appsCollSnapshot,
        id: getShortApplicationId(application.documentID),
        date: getApplicationCreationDate(application.createdAt),
        dialogueSnap: getDialogueSnap(chatsCollSnapshot, application.UID),
        applicant: `${application.passports[0].first_name} ${application.passports[0].last_name}`,
        status: application.preparedInformation.preparationStatus,
        countryFullName: country.name_ru,
        assignedTo: application.preparedInformation.assignedTo,
      }
    )
    return accum;
  }, [])
}

export const getFilters = (country, status, column, authorizedUser, appsSearchFilter) => { // Новый с пагинацией
  let filters = [
    where('paymentSuccessful', '==', true),
  ];

  if (authorizedUser.role === 'operator') {
    filters.push(where("preparedInformation.assignedTo", "==", authorizedUser.id));
  }

  if (appsSearchFilter) {
    // при добавлении диапазонных ограничителей, если есть так же и упорядочивающие ограничители - первым идет упорядочивание по свойству, по которому стоит диапазонное ограничение. Затем указываются остальные упорядочивающие.
    filters.push(where('UID', '>=', appsSearchFilter))
    filters.push(where('UID', '<=', appsSearchFilter + '\uf8ff'))
    filters.push(orderBy("UID"))
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

  filters.push(orderBy("createdAt", "desc"))

  return filters;
}

export const resetBeforeDownloadFilteredData = (lastDoc, setLastDoc, setTableData) => {
  setTableData([])
  if(lastDoc) setLastDoc(null); // обязательно стираем сохраненный последний документ, если заявки подгружались.
}