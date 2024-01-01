import { testStatuses } from "../../../helpers/app-status"

export const getStatusesSelectOptions = () => {
  return ( 
    [
      {
        label: testStatuses[0].selectLabel,
        value: testStatuses[0].dbProp,
      },
      {
        label: testStatuses[1].selectLabel,
        value: testStatuses[1].dbProp,
      },
      {
        label: testStatuses[2].selectLabel,
        value: testStatuses[2].dbProp,
      },
    ]
  )
}

