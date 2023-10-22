import { auth } from "../firebase"
import { updateOperator } from "../operator/operators-data-processing"

export const getProfileFormFields = (authorizedUser) => {
  return [
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
    },
  ]
}

export const updateOperatorProfile = async (authorizedUser, admins, formState) => {
  const updatedAdminInfoProperties = formState.reduce((acc, property) => {
    acc[property.name] = property.value;
    return acc
  }, {})
  console.log(updatedAdminInfoProperties)
  
  const updatedAdmins = admins.map(admin => {
    if (admin.id === authorizedUser.id) {
      return {...admin, ...updatedAdminInfoProperties}
    }
    return admin;
  })

  try {
    await updateOperator(updatedAdmins);
  } catch (e) {
    throw e;
  }
}
