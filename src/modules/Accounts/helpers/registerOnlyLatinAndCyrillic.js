import { library as lib } from "../../../lib";
const validationError = lib.validationErrorMessages;

export const registerOnlyLatinAndCyrillic = (_, value) => {
  if(value === undefined) {
    return  Promise.reject();
  }

  let flag = true;
  for(let elem of value.split("")) {
    if(!/[a-zA-Zа-яёА-ЯЁ]/.test(elem)){
      flag = false;
      break;
    }
  }
  return flag 
    ? Promise.resolve() 
    : Promise.reject(new Error(validationError.onlyLatinAndCyrillic));
};
