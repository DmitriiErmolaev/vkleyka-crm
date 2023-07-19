import {where} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { getCountryFlag } from "../countries/countries";

const addZero = (num) => {
  return (num < 10) ? `0${num}` : num;
}

const getShortYear = (year) => {
  return +String(year).slice(2);
}

// ====== Получают данные для отображение в таблице ======
export const getApplicationId = (docId) => {
  let id = docId.slice(0,4).toUpperCase();
  return id
}

export const getApplicationCreationDate = (s) => {
  // TODO: проверить какую дату получают пользователи из других временных зон
  const date = new Date(s * 1000);
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

export const getDataForTable = (applications, applicants, countries) => {
  return applications.reduce((accum, application) => {

    if( !application.paymentSuccessful) {
      //временно: чтобы не отображать в таблице неоплаченные заявки.
      return accum;
    } 
    accum.push(
      {
        countryFlag: getCountryFlag(countries, application.country_code),
        fullDocId: application.documentID,
        id: getApplicationId(application.documentID),
        date: getApplicationCreationDate(application.createdAt.seconds),
        applicant: getUserName(applicants, application.UID), 
        status: application.preparedInformation.preparationStatus,
        country: getFullCountryName(countries, application.country_code),
        assignedTo: application.preparedInformation.assignedTo,
      }
    )
    return accum;
  }, [])
}

export const setApplicationOperator = async (ref, fileName, value) => {
  await updateDoc(ref, fileName, value)
}

export const getFilters = (country, status, column, initialQueryConstraints) => {
  let filters = [];
  filters.push(initialQueryConstraints)
  
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