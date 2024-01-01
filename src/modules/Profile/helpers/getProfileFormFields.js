export const getProfileFormFields = (authorizedUser) => {
  return {
    regularProfileData: [
      {
        name: 'name',
        value: authorizedUser.name,
      },
      {
        name: 'phoneNumber',
        value: authorizedUser.phoneNumber,
      },
      {
        name: 'email',
        value: authorizedUser.email,
      }
    ],
    email: [
      {
        name: 'email',
        value: authorizedUser.email,
      },
    ]
  }
};
