import { runTransaction } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { openNotification } from "../../../models/notification/notification";
import showNotification from "../../NotificationService/helpers/showNotification";

export const reassign = async (appsCollSnap, chatCollSnap, selectedOperator, notificationAPI) => {
  // если один из методов транзакции провалится - все изменения будут невыполнены.
  try {
    await runTransaction(firestore, async (transaction) => {
      if(appsCollSnap.size) {
        appsCollSnap.docs.map(appDoc => transaction.update(appDoc.ref, "preparedInformation.assignedTo", selectedOperator));
      }
      if(chatCollSnap.size) transaction.update(chatCollSnap.docs[0].ref, 'assignedTo', selectedOperator);
    })
    showNotification(notificationAPI, 'process', {processName: 'reassignOperator', status: 'success',})

    // openNotification(notificationAPI, 'success', 'reassignOperator' )
  } catch (error) {
    console.log(error)
    showNotification(notificationAPI, 'process', {processName: 'reassignOperator', status: 'error',})

    // openNotification(notificationAPI, 'error', 'reassignOperator')
  }
};
