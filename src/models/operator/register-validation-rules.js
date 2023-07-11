export const fieldRules = {
  operatorName: [
    {
      required: true,
      message:"Введите имя"
    },
    {
      validator:(rule, value) => {
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
        if(flag) {
          return Promise.resolve()
        } else {
          return Promise.reject(new Error("Имя может содержать только буквы на латинице или кириллице"));
        }
      }
    },
  ],
  surname: [
    {
      required: true,
      message:"Введите фамилию"
    },
    {
      validator:(rule, value) => {
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
        if(flag) {
          return Promise.resolve()
        } else {
          return Promise.reject(new Error("Имя может содержать только буквы на латинице или кириллице"));
        }
      }
    },
  ],
  tel: [
    {
      required: true,
      message:"Введите номер телефона"
    },
    {
      type:"tel"
    },
    {
      validateTrigger:"onBlur",
      validator: (rule, value) => {
        let valid = /^\+\d+$/.test(value);
        if(valid) {
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('Номер телефона должен начинаться с кода страны через "+" и содержать только цифры '))
        }
      }
    }
  ],
  email:[
    {
      required:true,
      message:"введите E-mail адрес",
    },
    {
      type:"email",
      message:"неверный E-mail адрес"
    }
  ],
  password:[
    {
      required: true,
      message:"Введите пароль"
    },
    {
      min: 6,
      message:"Пароль должен содержать минимум 6 символов."
    },
    {
      max: 16,
      message:"Пароль должен содержать не более 16 символов"
    },
    {
      validateTrigger:"onBlur",
      validator: (rule, value) => {
        console.log(value)
        let isUpperCase = /[A-Z]+/.test(value);
        let isLowerCase = /[a-z]+/.test(value);
        let isSpecialSymbol = /[!"$&'()*+,-.:;=[\]\\^_`{|}~]+/.test(value);
        let kirillicSymbol = /[а-яёА-ЯЁ]+/.test(value);
        let isDigit = /[\d]+/.test(value);
        let isRestrictedSymbol = /[?#<>%@/\s]+/.test(value)
        if(kirillicSymbol) {
          return Promise.reject(new Error('Пароль не должен содержать кирилицу'))
        }
        if(isRestrictedSymbol) {
          return Promise.reject(new Error('Пароль не должен содеражть символы: "? # < > % @ /" а так же пробельные символы'))
        }
        if(isUpperCase && isLowerCase && isSpecialSymbol && isDigit) {
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, 1 цифру и 1 спецсимвол,  '))
        }
        
      }
    },
  ],
  passConfirm: [
    {     // rule object
      required: true,
      message:"Пожалуйста, подтвердите пароль!"
    },
    ({getFieldValue}) => {  // rule function, возвращающая rule object.
      return { // возвращает rule object
        validator: (rule, value) => { 
          if(getFieldValue("pass") === value){
            return Promise.resolve()
          } else {
            return Promise.reject(new Error('The new password that you entered do not match!'))
          }
        }
      }
    }
  ],
}