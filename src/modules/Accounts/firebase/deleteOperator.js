import updateDocField  from "../../../firebase/updateDocField";
import { openNotification } from "../../../models/notification/notification";
import { getAdminsRef } from "../../../firebase/admins/getAdminsRef";
import showNotification from "../../NotificationService/helpers/showNotification";

export const deleteOperator = async (admins, id, notificationAPI) => {
  try {
    const adminsAfterDeletion = admins.filter((admin)=> {
      if(admin.id === id ) return false;
      return true;
    })
    await updateDocField(getAdminsRef(), 'admins', adminsAfterDeletion)
    showNotification(notificationAPI, 'process', {processName: 'opeartorDelete', status: 'success',})
    showNotification(notificationAPI, 'process', {processName: 'opeartorDelete', status: 'warning',})

    // openNotification(notificationAPI, "success", "opeartorDelete");
    // openNotification(notificationAPI, "warning", "opeartorDelete");
  } catch (error) {
    console.log(error)
    showNotification(notificationAPI, 'process', {processName: 'opeartorDelete', status: 'error',})

    // openNotification(notificationAPI, "error", "opeartorDelete");
  }
};
