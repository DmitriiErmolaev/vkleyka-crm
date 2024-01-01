import { library } from "../../../lib";
import { registerOnlyLatinAndCyrillic } from "./registerOnlyLatinAndCyrillic";
import { registerPassConfirm } from "./registerPassConfirm";
import { registerPassword } from "./registerPassword";
import { registerPhone } from "./registerPhone";

const validationError = library.validationErrorMessages;

export const registerFieldRules = {
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
};
