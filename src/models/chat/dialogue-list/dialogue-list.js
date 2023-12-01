import { Skeleton, Spin } from "antd";
import DialogueListItem from "../../../components/chat/DialogueListItem";
  // TODO: рефакторинг

const operatorDialogueListGroups = {
  myDialogues: 'Мои чаты',
  grabableDialogues: 'Все чаты',
} 
  // TODO: рефакторинг

export const dialogListOperations = {
  admin: {
    // getDialogueList: getAdminDialogueData,
  },
  operator: {
    // getDialogueList: getOperatorDialogueData,
    groups: {
      myDialogues: {
        enName: 'myDialogues',
        ruName: 'Мои чаты',
      },
      grabableDialogues: {
        enName: 'grabableDialogues',
        ruName: 'Все чаты',
      },
    }
  }
}
const getOrderedDialoguesSnapshots = (chatsCollSnapshot) => {
  return chatsCollSnapshot.docs.sort((a, b) => {
    const firstDialogueLastMessageTime = a.get('messages')[a.get('messages').length - 1]?.time.toMillis();
    const secondDialogueLastMessageTime = b.get('messages')[b.get('messages').length - 1]?.time.toMillis();

    if (firstDialogueLastMessageTime > secondDialogueLastMessageTime) {
      return -1;
    } if (firstDialogueLastMessageTime < secondDialogueLastMessageTime) {
      return 1;
    } else {
      return 0;
    }
  })
}

export function getDialogueList(authorizedUser, chatsCollSnapshot, clients, appsCollSnapshot, selectedDialogue, scrollMode, functions) {
  // TODO: рефакторинг
  const orderedDialoguesSnapshots = getOrderedDialoguesSnapshots(chatsCollSnapshot)
  if(authorizedUser.role === 'operator') return getOperatorDialogueData(authorizedUser, orderedDialoguesSnapshots,  clients, appsCollSnapshot, selectedDialogue, scrollMode, functions);
  if(authorizedUser.role === 'admin') return getAdminDialogueData(orderedDialoguesSnapshots, clients,  appsCollSnapshot, selectedDialogue, functions);
}

function getOperatorDialogueData(authorizedUser, orderedDialoguesSnapshots, clients, appsCollSnapshot, selectedDialogue, scrollMode, functions) {
  // TODO: рефакторинг
  const dialoguesListGroups = orderedDialoguesSnapshots.reduce((acc, dialogueSnap) => {
    const dialogue = dialogueSnap.data();

    const unreadMessagesNumber = dialogue.messages.reduce((acc, message) => {
      //TODO: проверка имени отправителя с именем визовика надо будет исправить на сравнение айдишников. Айди отправителя !== authorizedUser.id
      // console.log(selectedDialogue?.dialogue.UID)
      // console.log(dialogue.UID)
      // не пополняем счетчик непрочитанных сообщений для перебираемого диалога, если этот диалог открыт и прокручен книзу.
      if(dialogue.UID === selectedDialogue?.dialogue.UID && !scrollMode) return acc;
      if(message.sendState === 0 && message.sender !== authorizedUser.name) {
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
}

function getAdminDialogueData(orderedDialoguesSnapshots, clients, appsCollSnapshot, selectedDialogue, functions) {
  // TODO: рефакторинг
  const dialoguesList = orderedDialoguesSnapshots.map(dialogueSnap => {
    // if (dialogueSnap.get('UID') === 'VFsLjgXQNMS5PAF3INqwO1ET3sB3') { // TODO: обход бага. Решить с Жангиром
    //   return false;
    // }

    const dialogue = dialogueSnap.data();

    // const unreadMessagesNumber = dialogue.messages.reduce((acc, message) => {
    //   if(message.sendState === 0 && message.sender !== authorizedUser.name) {   // админам не нужны отметки непрочитанных сообщений.
    //     ++acc;
    //   }
    //   return acc;
    // }, 0)

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
        // unreadMessagesNumber={unreadMessagesNumber}
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
}
