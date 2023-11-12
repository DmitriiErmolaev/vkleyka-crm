import { Link } from "react-router-dom";

export const topMenuItems =
[
  {key:"/notifications", label:(<Link to='/notifications'>Уведомления</Link>),}, // сейчас, т.к. нет такого роута - редиректит на главную. Кнопка "Уведомления" гореть не будет.
  {key:"/user-profile", label:(<Link to='/user-profile'>Профиль</Link>),},
]

export const checkLocationIsFromTopMenu = (location) => {
  return topMenuItems.some(menuItem => menuItem.key === location)
}
