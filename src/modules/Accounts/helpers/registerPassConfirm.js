import { library as lib } from "../../../lib";
const validationError = lib.validationErrorMessages;

export const registerPassConfirm = ({getFieldValue}) => {
  return  { // функция вместо объекта, возвращающая rule object.
    validator: (_, value) => { // rule object
      if(getFieldValue("pass") === value){
        return Promise.resolve()
      } else {
        return Promise.reject(new Error(validationError.passwordDismatch))
      }
    }
  }
};
