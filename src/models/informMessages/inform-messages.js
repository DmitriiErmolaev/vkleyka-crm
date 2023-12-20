import { serverTimestamp } from "firebase/firestore";
import { getShortApplicationId } from "../applications/table-data-processing";

const messages = {
  1: '`Эксперт взял в обработку ваше заявление ',
  2: 'Обработка вашего заявления щавершена ',
  documentUploaded: 'Позравляем. Ваши документы готовы',
  greetings: 'Здравствуйте, '
}

export const createInformMessage = (event, additionalString) => {
  return {
    message: {
      content: messages[event] + additionalString,
      time: serverTimestamp(),
      title: 'Статус заявки изменен',
    },
    type: 'appStatusChangedMessage',
  }
}
