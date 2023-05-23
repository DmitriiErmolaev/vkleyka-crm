import React from "react";
import "../assets/aside.scss"


const roles = {
  "visa officer":["Активити", "Чат"],
  "manager":["Анкета", "Инфо о визе", "Тип визы"],
  "admin":["Анкета", "Инфо о визе", "Тип визы","Страны"],
}

const Aside = ({role}) => {

  

  // let array = roles[role].map(item => {
  //   return <li className="menu__item"><a className="menu__item-link" href="#">{item}</a></li>
  // })



  return (
    <nav className="menu">
      <ul className="menu__list">
        {/* {array} */}
        <li className="menu__item"><a className="menu__item-link" href="#">Активити</a></li>
        <li className="menu__item"><a className="menu__item-link" href="#">Чат</a></li>
      </ul>
    </nav>
  
  )
}

export default Aside;