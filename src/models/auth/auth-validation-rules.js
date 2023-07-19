export const fieldRules = {
  email: [
    {
      required: true,
      message: 'Пожалуйста, введите email!',
    },
    {
      type: "email",
      message: "Некорректный email!"
    }
  ], 
  pass: [
    {
      required: true,
      message: 'Пожалуйста, введите пароль!',
    },
  ]
}