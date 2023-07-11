import {where} from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { getCountryFlag } from "../countries/countries";

const getCorrectMonth = (month) => {
  if(month < 10) {
    return `0${month + 1}`;
  }
  return month + 1;
}

const getShortYear = (year) => {
  return +String(year).slice(2);
}

// ====== Получают данные для отображение в таблице ======
export const getApplicationId = (docId) => {
  let id = docId.slice(0,4).toUpperCase();
  return id
}

export const getApplicationCreationDate = (createdAt) => {
  // TODO: проверить какую дату получают пользователи из других временных зон
  const ms = createdAt.seconds * 1000;
  let fullDate = new Date(ms);
  const date = fullDate.getDate();
  const correctMonth = getCorrectMonth(fullDate.getMonth());
  const shortYear = getShortYear(fullDate.getFullYear());
  return `${date}/${correctMonth}/${shortYear}`;
}

export const getUserName = (users, uid) => {
  console.log(users)
  console.log(uid)
  const user = users.find(user => {
    return user.UID === uid
  })
  console.log(user)
  return user.name
}

export const getFullCountryName = (countries, countryCode) => {
  const findedCountry = countries.find(country => {
    return countryCode === country.country_code;
  })
  return findedCountry.name_ru
}

export const getDataForTable = (applications, applicants, countries) => {
  console.log(applications)
  console.log(applicants)
  console.log(countries)
  return applications.reduce((accum, application) => {
    if(!application.paymentSuccessful) {
      //временно: чтобы не отображать в таблице неоплаченные заявки.
      return accum;
    }
    
    accum.push(
      {
        countryFlag: getCountryFlag(countries, application.country_code),
        fullDocId: application.documentID,
        id: getApplicationId(application.documentID),
        date: getApplicationCreationDate(application.createdAt),
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
  console.log(initialQueryConstraints)
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
  if(status && status !== "allStatuses") {
    filters.push(where("preparedInformation.preparationStatus", "==", status))
  }

  return filters;
}