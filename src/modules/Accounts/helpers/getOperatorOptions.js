import { GLOBAL_ROLES } from "../../../models/role-based-rules";

// ----Матрица поиска свойств из загруженных данных для операторов----
// 1) имя свойства - соответствует такому же свойству в объекте массива options для антовского селектора
// 2) Значение - свойство хранящее нужную нам информацию в объекте скаченных данных.
const operatorOptionMatrix = {
  optionLabel: "name",
  optionValue: "id",
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
};
