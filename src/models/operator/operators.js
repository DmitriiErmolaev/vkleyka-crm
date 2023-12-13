import {firestore} from "../firebase";
import {doc} from "firebase/firestore";
import { GLOBAL_ROLES } from "../role-based-rules";

export const adminsPath = {
  admins: "admins/all-admins", // массив всех админов содержит и админов и оперторов(визовиков)
}

// ----Матрица поиска свойств из загруженных данных для операторов----
// 1) имя свойства - соответствует такому же свойству в объекте массива options для антовского селектора
// 2) Значение - свойство хранящее нужную нам информацию в объекте скаченных данных.
export const operatorOptionMatrix = {
  optionLabel: "name",
  optionValue: "id",
}

export const getAdminsRef = () => {
  return doc(firestore, adminsPath.admins);
}

export const getOperatorOptions = (data) => {
  // TODO : функцию отнести к операторам. Убрать проверку на операторСелект
  return data.reduce((accum, admin) => {
    if(admin.role !== GLOBAL_ROLES.operator) {
      return accum;
    }
    accum.push(
      {
        label: admin[operatorOptionMatrix.optionLabel],
        value: admin[operatorOptionMatrix.optionValue],
      }
    )
    return accum
  },[])
}
