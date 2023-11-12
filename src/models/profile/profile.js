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

export const updateOperatorProfile = async (user, authorizedUser, admins, values) => {
  // const updatedAdminInfo = {...authorizedUser, ...values}; // Удалить если не надо
  console.log(values)
  const updatedAdmins = admins.map(admin => {
    if (admin.id === authorizedUser.id) {
      return {...authorizedUser, ...values};
    }
    return admin;
  })

  // const prevEmail = fields.find((field) => field.name === 'email').value;
  // const newEmail = formState.find((field) => field.name === 'email').value;
  // console.log(prevEmail);
  // console.log(newEmail);
  try {
    // if (prevEmail !== newEmail) {
    //   await verifyBeforeUpdateEmail(user, newEmail)
    // }
    await updateOperator(updatedAdmins);
    console.log('готово')
  } catch (e) {
    throw e;
  }
}
