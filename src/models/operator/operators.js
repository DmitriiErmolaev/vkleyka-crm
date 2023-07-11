import {firestore} from "../firebase";
import {doc} from "firebase/firestore";

// массив всех админов содержит и админов и оперторов(визовиков)
export const adminsPath = {
  admins: "admins/all-admins",
}

// ----Матрица поиска свойств из загруженных данных для операторов----
// 1) имя свойства - соответствует такому же свойству в объекте массива options для антовского селектора
// 2) Значение - свойство хранящее нужную нам информацию в объекте скаченных данных.  
export const operatorOptionMatrix = {
  optionLabel: "name",
  id: "key",
}

export const getAdminsRef = () => {
  return doc(firestore, adminsPath.admins);
}

