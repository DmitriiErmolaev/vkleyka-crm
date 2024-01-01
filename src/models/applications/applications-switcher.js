import { getShortApplicationId } from "../../utils/getShortApplicationId";
import { getApplicationCreationDate } from "../../utils/getApplicationCreationDate";

export const getApplicationsSwitcherOptions = (clientApplicationsSnapshots) => {
  return clientApplicationsSnapshots.map(appSnap => {
    return {
      label: `${getShortApplicationId(appSnap.id)}-${getApplicationCreationDate(appSnap.get('createdAt'))}`,
      value: appSnap.id,
    }
  })
}
