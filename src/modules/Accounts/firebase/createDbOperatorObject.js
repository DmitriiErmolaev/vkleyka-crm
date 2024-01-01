import updateDocField  from "../../../firebase/updateDocField"
import { getAdminsRef } from "../../../firebase/admins/getAdminsRef"
import { GLOBAL_ROLES } from "../../../models/role-based-rules"

export const createDbOperatorObject = async (admins, newOperatorFormValues, newUser ) => {
  const updatedAdmins = [...admins, {
    id: newUser.uid,
    name: `${newOperatorFormValues.name} ${newOperatorFormValues.surname}`,
    role: GLOBAL_ROLES.operator,
    phoneNumber: newOperatorFormValues.tel,
    email: newUser.email,
    
  }]
  await updateDocField(getAdminsRef(), 'admins', updatedAdmins)
}
