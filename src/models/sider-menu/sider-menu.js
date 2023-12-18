import { Link } from "react-router-dom";
import SiderMenuChatField from "../../components/layout/sider/SiderMenuChatField";
const getMenuItemsSample = () => {
  return [
    {
      roles: ['admin', 'operator'],
      menuItem: {
        key:"/",
        label: <Link to="/" onClick={() => {}}>Все заявки</Link>,
      },
    },
    {
      roles: ['admin'],
      menuItem: {
        key:"/users-manager",
        label: <Link to="users-manager">Менеджер аккаунтов</Link>
      },
    },
    {
      roles: ['admin', 'operator'],
      menuItem: {
        key:"/chat",
        label: <SiderMenuChatField />,
      },
    }
  ]
}
// const siderMenuItemsSample = [
//   {
//     roles: ['admin', 'operator'],
//     menuItem: {
//       key:"/",
//       label: <Link to="/" onClick={() => {}}>Все заявки</Link>,
//     },
//   },
//   {
//     roles: ['admin'],
//     menuItem: {
//       key:"/users-manager",
//       label: <Link to="users-manager">Менеджер аккаунтов</Link>
//     },
//   },
//   {
//     roles: ['admin', 'operator'],
//     menuItem: {
//       key:"/chat",
//       label: <SiderMenuChatField />,
//     },
//   }
// ]

export const getItems = (role, dialogueForApplication, selectedDialogue, setSelectedDialogue, unreadMessagesCount  ) => {
  const siderMenuItemsSample = [
    {
      roles: ['admin', 'operator'],
      menuItem: {
        key:"/",
        label: (
          <Link
            to="/"
            onClick={(e) => {
              if (dialogueForApplication?.current) {
                if (dialogueForApplication.current.UID === selectedDialogue.dialogue.UID) {
                  setSelectedDialogue(null);
                }
                dialogueForApplication.current = null;
              }
            }}
          >
            Все заявки
          </Link>
        ),
      },
    },
    {
      roles: ['admin'],
      menuItem: {
        key:"/users-manager",
        label: <Link to="users-manager">Менеджер аккаунтов</Link>
      },
    },
    {
      roles: ['admin', 'operator'],
      menuItem: {
        key:"/chat",
        label: <SiderMenuChatField unreadMessagesCount={unreadMessagesCount}/>,
      },
    }
  ]
  return siderMenuItemsSample.reduce((acc, menuItemSample) => {
    if (menuItemSample.roles.includes(role)) {
      acc.push(menuItemSample.menuItem);
      return acc;
    }
    return acc;
  }, [])
}


export const checkLocationIsFromSiderMenu = (role, location) => {
  const menuItems = getItems(role);
  return menuItems.some(menuItem => menuItem.key === location);
}