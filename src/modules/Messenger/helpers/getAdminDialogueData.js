import { getAllFieldsFromDocSnapshot } from "../../../helpers/getAllFieldsFromDocSnapshot";
import DialogueListItem from "../components/DialogueListItem";

export function getAdminDialogueData(orderedDialoguesSnapshots, clients, appsCollSnapshot, selectedDialogue, functions) {
// export function getAdminDialogueData(orderedDialoguesSnapshots, clients, selectedDialogue, functions) {
  // TODO: рефакторинг
  const dialoguesList = orderedDialoguesSnapshots.map(dialogueSnap => {
    const dialogue = getAllFieldsFromDocSnapshot(dialogueSnap);
    const unreadMessagesNumber = dialogue.messages.reduce((acc, message) => {
      // админ пока не может узнать, находится ли визовик в чате и прокручен ли он у него книзу, чтобы не плюсовать непрочитанные сообщения.
      if(message.readBy && !message.readBy.includes('operator')) {
        ++acc;
      }
      return acc;
    }, 0)

    const client = clients.find(user => {
      return user.UID === dialogue.UID;
    })

    const clientApplicationsSnaps = appsCollSnapshot.docs.reduce((acc, appSnap) => {
      if (appSnap.get("UID") === dialogue.UID) {
        acc.push(appSnap);
        return acc;
      }
      return acc;
    }, [])

    return (
      <DialogueListItem
        key={dialogue.UID}
        client={client}
        dialogue={dialogue}
        dialogueSnap={dialogueSnap}
        selectedDialogue={selectedDialogue}
        functions={functions}
        unreadMessagesNumber={unreadMessagesNumber}
        clientApplicationsSnaps={clientApplicationsSnaps}
      />
    )
  })

  if(dialoguesList.length === 0) {
    dialoguesList.push(
      <div key='dialoguesAreAbsent' style={{textAlign:'center', color:'#b8b8b8', fontStyle:'italic'}}>
        Диалогов нет
      </div>
    )
  }
  return dialoguesList;
};
