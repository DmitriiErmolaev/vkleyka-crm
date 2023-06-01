import React from "react";
import "../assets/header.scss"

const Header = () => {
  return (
    <header className="header-container">
      <div className="header__logo">Лого</div>
      <div className="header__inner">
        <input className="search-bar" type="search" placeholder="Поиск"/>
        <nav className="header__nav">
          <a className="nav__link" href="#">Уведомления</a>
          <a className="nav__link profile" href="#">Профиль</a>
        </nav>
      </div>
    </header>
  )
}

export default Header;