import React from "react";
import "../assets/button.scss";



const Button = ({name, id, toggleActive, styles}) => {

  

  return <a className={styles} href="#" onClick={() => toggleActive(id)}><li className="filters__item" >{name}</li></a>;
}

export default Button;