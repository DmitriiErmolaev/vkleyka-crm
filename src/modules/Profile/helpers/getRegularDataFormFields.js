export const  getRegularDataFormFields = (authorizedUser) => {
  return  [
    {
      name: 'name',
      value: authorizedUser.name,
    },
    {
      name: 'phoneNumber',
      value: authorizedUser.phoneNumber,
    },
  ]
};
