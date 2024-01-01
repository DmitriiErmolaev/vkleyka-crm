import { orderBy, where } from "firebase/firestore";

export const getFilters = (country, status, column, authorizedUser, appsSearchFilter, pageCount) => {
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
