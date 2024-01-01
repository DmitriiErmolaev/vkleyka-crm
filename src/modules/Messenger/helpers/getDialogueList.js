import { getAdminDialogueData } from "./getAdminDialogueData";
import { getOperatorDialogueData } from "./getOperatorDialogueData";
import { getOrderedDialoguesSnapshots } from "./getOrderedDialoguesSnapshots";

export function getDialogueList(authorizedUser, chatsCollSnapshot, clients, appsCollSnapshot, selectedDialogue, scrollMode, functions) {
// export function getDialogueList(authorizedUser, chatsCollSnapshot, clients, selectedDialogue, scrollMode, functions) {
  // TODO: рефакторинг
  const orderedDialoguesSnapshots = getOrderedDialoguesSnapshots(chatsCollSnapshot)
  if(authorizedUser.role === 'operator') return getOperatorDialogueData(authorizedUser, orderedDialoguesSnapshots,  clients, appsCollSnapshot, selectedDialogue, scrollMode, functions);
  if(authorizedUser.role === 'admin') return getAdminDialogueData(orderedDialoguesSnapshots, clients,  appsCollSnapshot, selectedDialogue, functions);
  // if(authorizedUser.role === 'operator') return getOperatorDialogueData(authorizedUser, orderedDialoguesSnapshots,  clients, selectedDialogue, scrollMode, functions);
  // if(authorizedUser.role === 'admin') return getAdminDialogueData(orderedDialoguesSnapshots, clients, selectedDialogue, functions);
};
