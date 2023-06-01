import React, {useState} from "react";
import "../assets/commfilters.scss";
import Button from "./Button";

const buttons = [
  {
    id:"1",
    name:"Все",
    isActive: false,
    style: "outlined",
  },
  {
    id:"2",
    name:"Новые",
    isActive: false,
    style: "outlined",
  },
  {
    id:"3",
    name:"В процессе",
    isActive: false,
    style: "outlined",
  },
  {
    id:"4",
    name:"Завершенные",
    isActive: false,
    style: "outlineless",
  }
]

 

const CommFilters = () => {
  const [links, setLinks] = useState(buttons);

  const toggleActive = (id) => {
    setLinks(links.map(link => {
      if(id !== link.id && link.isActive ){
        return {...link, isActive:false}
      }
      if(id === link.id && !link.isActive ) {
        return {...link, isActive:true}
      }
      return link;
    }))
  }

  let result = links.map(link => {
    let style = "comm-filters__link "
    if(link.style === "outlineless") {
      style += "outlineless "
    }
    if(link.isActive){
      style += "active "
    }
    
    return <Button  key={link.id} id={link.id} name={link.name} toggleActive={toggleActive} styles={style}/>
  })

  return (
    <div className="comm-filters-container">
      <ul className="comm-filters__list">
        {result}
      </ul>
      
    </div>
  )
}

export default CommFilters;