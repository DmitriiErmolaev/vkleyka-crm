import { getCountry } from "../../../helpers/countries/getCountry";
import { getDocFromCollectionByFieldAndValue } from "../../../helpers/getDocFromCollectionByFieldAndValue";
import { getApplicationCreationDate } from "../../../utils/getApplicationCreationDate";
import { getShortApplicationId } from "../../../utils/getShortApplicationId";

export const getDataForTable = (applications, countries, chatsCollSnapshot, appsCollSnapshot, dialogueForApplication, setSelectedDialogue, clientsData ) => {
  return applications.reduce((accum, application) => {
    const country = getCountry(countries, application.country_code);
    const client = clientsData.find(client => application.UID === client.UID)
    accum.push(
      {
        accountIsDeleted: !client?.UID,
        key: application.documentID,
        clientId: application.UID,
        country: country,
        appsCollSnapshot: appsCollSnapshot,
        dialogueForApplication: dialogueForApplication,
        setSelectedDialogue: setSelectedDialogue,
        id: getShortApplicationId(application.documentID),
        date: getApplicationCreationDate(application.createdAt),
        dialogueSnap: getDocFromCollectionByFieldAndValue(chatsCollSnapshot, 'UID', application.UID),
        applicant: client?.name || client?.phone || client?.email || client?.UID || 'Аккаут удален',
        phone: client?.phone,
        status: application.preparedInformation.preparationStatus,
        countryFullName: country.name_ru,
        assignedTo: application.preparedInformation.assignedTo,
      }
    )
    return accum;
  }, [])
}
