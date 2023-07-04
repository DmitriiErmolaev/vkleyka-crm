import {Link} from "react-router-dom";
import {where} from "firebase/firestore";

export const GLOBAL_ROLES = {
  admin: "admin",
  operator: "operator", 
}

export const roleBasedContent = {
  admin:{
    siderMenuItems: [
      {
        key:"/",
        label:(<Link to="/">Все заявки</Link>),
      },
      {
        key:"/users-manager",
        label:(<Link to="users-manager">Менеджер аккаунтов</Link>)
      },
    ],
    collectionConstraints: "all-applications",
    initialQueryConstraints: null,
    columnsIncluded: ["all", "admin"],
  },
  operator:{
    siderMenuItems: [
      {
        key:"/",
        label:(<Link to="/">Все заявки</Link>),
      },
      {
        key:"/chat",
        label:(<Link to="chat">Чат</Link>)
      },
    ],
    collectionConstraint: "assigned-only",
    initialQueryConstraints: where("preparedInformation.assignedTo", "==", "Гаухар"),
    columnsIncluded: ["all", "operator"],
  }
}

