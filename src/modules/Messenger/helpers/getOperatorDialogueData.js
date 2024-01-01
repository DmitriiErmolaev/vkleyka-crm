import { getAllFieldsFromDocSnapshot } from "../../../helpers/getAllFieldsFromDocSnapshot";
import DialogueListItem from "../components/DialogueListItem";
import { dialogListOperations } from "./dialogListOperations";

export function getOperatorDialogueData(authorizedUser, orderedDialoguesSnapshots, clients, appsCollSnapshot, selectedDialogue, scrollMode, functions) {
// export function getOperatorDialogueData(authorizedUser, orderedDialoguesSnapshots, clients, selectedDialogue, scrollMode, functions) {
  // TODO: рефакторинг
  const dialoguesListGroups = orderedDialoguesSnapshots.reduce((acc, dialogueSnap) => {
    const dialogue = getAllFieldsFromDocSnapshot(dialogueSnap);

    const unreadMessagesNumber = dialogue.messages.reduce((acc, message) => {
      //TODO: проверка имени отправителя с именем визовика надо будет исправить на сравнение айдишников. Айди отправителя !== authorizedUser.id
      // console.log(selectedDialogue?.dialogue.UID)
      // console.log(dialogue.UID)
      // не пополняем счетчик непрочитанных сообщений для перебираемого диалога, если этот диалог открыт и прокручен книзу.
      if(dialogue.UID === selectedDialogue?.dialogue.UID && !scrollMode) return acc;
      if(message.readBy && !message.readBy.includes('operator')) {
        ++acc;
      }
      return acc;
    }, 0)

    const client = clients.find(user => {
      return user.UID === dialogue.UID;
    })

    const clientApplicationsSnaps = appsCollSnapshot.docs.reduce((acc, appSnap) => {
      // TODO убедиться, что
      if (appSnap.get("UID") === dialogue.UID && appSnap.get("preparedInformation.preparationStatus") !== 2) {
        acc.push(appSnap);
        return acc;
      }
      return acc;
    }, [])

    const dialogueListItem = (
      <DialogueListItem
        key={dialogue.UID}
        client={client}
        dialogue={dialogue}
        selectedDialogue={selectedDialogue}
        functions={functions}
        unreadMessagesNumber={unreadMessagesNumber}
        clientApplicationsSnaps={clientApplicationsSnaps}// т.к. если у клиента нет оплаченной заявки - то будет undefined.
        dialogueSnap={dialogueSnap}
      />
    )

    if (dialogue.assignedTo === authorizedUser.id && dialogue.active) {
      acc.myDialogues.push(dialogueListItem);
      return acc;
    }

    if ((!dialogue.assignedTo) && dialogue.active) {
      acc.grabableDialogues.push(dialogueListItem);
      return acc;
    }

    return acc;
  }, {myDialogues: [], grabableDialogues: [],})

  const dialoguesList = Object.entries(dialoguesListGroups).reduce((acc, dialogueListGroup) => {
    acc.push(
      <div key={dialogueListGroup[0]} className="dialogue-list__group">
        {dialogListOperations[authorizedUser.role].groups[dialogueListGroup[0]].ruName}
      </div>
    )
    if(dialogueListGroup[1].length === 0) {
      acc.push(
        <div key={`dialoguesAreAbsent-${dialogueListGroup[0]}`} style={{textAlign:'center', color:'#b8b8b8', fontStyle:'italic'}}>
          Диалогов нет
        </div>
      )
    } else {
      acc.push(...dialogueListGroup[1])
    }

    return acc;
  }, [])

  return dialoguesList;
};
