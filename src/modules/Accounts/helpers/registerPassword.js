import { library as lib } from "../../../lib";
const validationError = lib.validationErrorMessages;

export const registerPassword = (_, value) => {
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
};
