import updateDocField  from "../../../firebase/updateDocField";
import { getAdminsRef } from "../../../firebase/admins/getAdminsRef";

export const updateOperatorProfile = async (authorizedUser, admins, values) => {
  // Универсальная функция для обновления объекта админа или визовика коллекции admins.
  const updatedAdmins = admins.map(admin => {
    if (admin.id === authorizedUser.id) {
      return {...authorizedUser, ...values};
    }
    return admin;
  })
  
  try {
    await updateDocField(getAdminsRef(), 'admins', updatedAdmins)
  } catch (e) {
    throw e;
  }
};
