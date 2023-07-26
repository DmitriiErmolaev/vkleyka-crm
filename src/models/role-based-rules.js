import {Link} from "react-router-dom";

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
    cardOperatorAssigmentDisplayProperty: "flex"
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
    columnsIncluded: ["all", "operator"],
    cardOperatorAssigmentDisplayProperty: "none"
  }
}
