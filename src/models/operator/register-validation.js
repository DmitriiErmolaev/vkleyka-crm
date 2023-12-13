import { library as lib } from "../../lib";
const validationError = lib.validationErrorMessages;

const registerOnlyLatinAndCyrillic = (_, value) => {
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
}

const registerPhone = (_, value) => {
  let valid = /^\+\d+$/.test(value);
  return valid
    ? Promise.resolve()
    : Promise.reject(new Error('Номер телефона должен начинаться с кода страны через "+" и содержать только цифры '))
}

const registerPassword = (_, value) => {
  const isUpperCaseExists = /[A-Z]+/.test(value);
  const isLowerCaseExists  = /[a-z]+/.test(value);
  const isSpecialSymbolExists  = /[!"$&'()*+,-.:;=[\]\\^_`{|}~]+/.test(value);
  const isCyrillicSymbolExists  = /[а-яёА-ЯЁ]+/.test(value);
  const isDigitExists  = /[\d]+/.test(value);
  const isRestrictedSymbolExists  = /[?#<>%@/\s]+/.test(value)
  if(isCyrillicSymbolExists) {
    return Promise.reject(new Error(validationError.passwordCyrillicNotAllowed))
  }
  if(isRestrictedSymbolExists) {
    return Promise.reject(new Error(validationError.passwordRestrictedSymbolsNotAllowed))
  }
  if( isUpperCaseExists 
      && isLowerCaseExists 
      && isSpecialSymbolExists 
      && isDigitExists) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(validationError.passwordRequiredCharacterSet))
  }
}

const registerPassConfirm = ({getFieldValue}) => {
  return  { // функция вместо объекта, возвращающая rule object.
    validator: (_, value) => { // rule object
      if(getFieldValue("pass") === value){
        return Promise.resolve()
      } else {
        return Promise.reject(new Error(validationError.passwordDismatch))
      }
    }  
  }
}

export const fieldRules = {
  operatorName: [
    {
      validateTrigger:"onSubmit",
      required: true,
      message:validationError.requiredField,
    },
    {
      validateTrigger:"onChange",
      validator: registerOnlyLatinAndCyrillic,
    },
  ],
  surname: [
    {
      validateTrigger:"onSubmit",
      required: true,
      message:validationError.requiredField,
    },
    {
      validateTrigger:"onChange",
      validator: registerOnlyLatinAndCyrillic,
    },
  ],
  tel: [
    {
      validateTrigger:"onSubmit",
      required: true,
      message:validationError.requiredField,
    },
    {
      type:"tel"
    },
    {
      validateTrigger:"onChange",
      validator: registerPhone,
    }
  ],
  email:[
    {
      validateTrigger:"onSubmit",
      required:true,
      message:validationError.requiredField,
    },
    {
      validateTrigger:"onSubmit",
      type:"email",
      message:validationError.emailWrong,
    }
  ],
  password:[
    {
      validateTrigger:"onSubmit",
      required: true,
      message:validationError.requiredField,
    },
    {
      validateTrigger:"onBlur",
      min: 6,
      message:validationError.passwordMinLength,
    },
    {
      max: 16,
      message:validationError.passwordMaxLength,
    },
    {
      validateTrigger:"onBlur",
      validator: registerPassword,
    },
  ],
  passConfirm: [
    {
      validateTrigger:"onSubmit",
      required: true,
      message:validationError.requiredField,
    },
    registerPassConfirm,
  ],
}
