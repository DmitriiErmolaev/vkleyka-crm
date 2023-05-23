import React from "react";
import "../assets/button.scss";



const Button = ({name, id, toggleActive, style}) => {

  

  return <a className="filters__link" href="#" onClick={() => toggleActive(id)}><li className={style} >{name}</li></a>;
}

export default Button;