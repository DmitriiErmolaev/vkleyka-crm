import { verifyBeforeUpdateEmail } from "firebase/auth"
import { auth } from "../firebase"
import { updateOperator } from "../operator/operators-data-processing"

export const getProfileFormFields = (authorizedUser) => {
  return {
    regularProfileData: [{
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
    }],
    email: [
      {
        name: 'email',
        value: authorizedUser.email,
      },
    ]
  }
}

export const updateOperatorProfile = async (authorizedUser, admins, values) => {
  // Универсальная функция для обновления объекта админа или визовика коллекции admins.
  const updatedAdmins = admins.map(admin => {
    if (admin.id === authorizedUser.id) {
      return {...authorizedUser, ...values};
    }
    return admin;
  })

  try {
    await updateOperator(updatedAdmins);
    console.log('готово')
  } catch (e) {
    throw e;
  }
}
