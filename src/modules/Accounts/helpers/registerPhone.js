export const registerPhone = (_, value) => { 
  let valid = /^\+\d+$/.test(value);
  return valid
    ? Promise.resolve()
    : Promise.reject(new Error('Номер телефона должен начинаться с кода страны через "+" и содержать только цифры '))
};
