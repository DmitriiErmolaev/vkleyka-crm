import { Badge, Divider } from "antd";
import {Link} from "react-router-dom";

export const GLOBAL_ROLES = {
  admin: "admin",
  operator: "operator", 
}

export const roleBasedContent = {
  admin: {
    getSiderMenuItems: () => {
      return [
        {
          key:"/",
          label:(<Link to="/">Все заявки</Link>),
        },
        {
          key:"/users-manager",
          label:(<Link to="users-manager">Менеджер аккаунтов</Link>)
        },
        {
          key:"/chat",
          label:(
            <p>Чат</p>
          ),
        },
      ]
    },
    collectionConstraints: "all-applications",
    initialQueryConstraints: null,
    columnsIncluded: ["all", "admin"],
    cardOperatorAssigmentDisplayProperty: "flex",
  },
  operator:{
    getSiderMenuItems: (unreadMessages) => {
      return [
        {
          key:"/",
          label:(<Link to="/">Все заявки</Link>),
        },
        {
          key:"/chat",
          label: (
            <div style={{display: "flex", justifyContent: "space-between", alignItems:'center'}}>
              <p >Чат</p>
              <Badge  count={unreadMessages} styles={{root:{color: "white"}, indicator: {boxShadow:'none', backgroundColor:"#56DA27"}}}/>
            </div>
          ),
        },
      ]
    },
    collectionConstraint: "assigned-only",
    columnsIncluded: ["all", "operator"],
    cardOperatorAssigmentDisplayProperty: "none"
  }
}
