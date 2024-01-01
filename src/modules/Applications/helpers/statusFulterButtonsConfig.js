import { testStatuses } from "../../../helpers/app-status";

export const statusFulterButtonsConfig ={
  new:{
    value: testStatuses[0].dbProp,
    text: testStatuses[0].buttonFilterValue,
  },
  inProgress:{
    value: testStatuses[1].dbProp,
    text: testStatuses[1].buttonFilterValue,
  },
  finished:{
    value: testStatuses[2].dbProp,
    text: testStatuses[2].buttonFilterValue,
  },
  // cancelled:{
  //   value: testStatuses[3].dbProp,
  //   text: testStatuses[3].value,
  // },
}