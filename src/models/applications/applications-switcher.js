import { getShortApplicationId, getApplicationCreationDate } from "./table-data-processing";

export const getApplicationsSwitcherOptions = (clientApplicationsSnapshots) => {
  return clientApplicationsSnapshots.map(appSnap => {
    return {
      label: `${getShortApplicationId(appSnap.id)}-${getApplicationCreationDate(appSnap.get('createdAt'))}`,
      value: appSnap.id,
    }
  })
}