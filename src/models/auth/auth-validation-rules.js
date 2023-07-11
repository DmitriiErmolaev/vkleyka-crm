export const fieldRules = {
  email: [
    {
      required: true,
      message: 'Please input your username!',
    },
    {
      type: "email",
      message: "неверный формат"
    }
  ], 
  pass: [
    {
      required: true,
      message: 'Please input your password!',
    },
  ]
}