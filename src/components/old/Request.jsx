import React from "react";
import "../assets/request.scss";
import {ReactComponent as MessageIcon } from "../images/icon.svg"


const Request = ({}) => {
  return (
    <div className="request-container">
      <div className="request__card">
        <div className="card__user-info">
          <div className="avatar">
            <a className="avatar__link" href="#"><img className="avatar__img" src="/avatars/avatar1.png" alt="аватарка" /></a>
          </div>
          <p className="user-name">Сара Айбарова</p>
        </div>
        <div className="card__request-info">
          <div className="request-num">
            <h3 className="title">Номер заявки</h3>
            <p className="number">#502369</p>
          </div>
          <div className="request-destination">
            <h3 className="title">Направление</h3>
            <p className="destination">Индия - Туристическая</p>
          </div>
          <div className="user-chat">
            <div className="icon-container">
              <MessageIcon />
            </div>
          </div>
          <div className="request-num">
            <h3 className="title">Статус заявки</h3>
            <p className="status">завершена</p>
          </div>
        </div>
        <p></p>
      </div>

    </div>
  )
}

export default Request;