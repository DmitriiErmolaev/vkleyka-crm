import React,{useState} from "react";
import "../assets/countryfilter.scss";
import Button from "./Button";


const buttons = [
  {
    id:"1",
    name:"США",
    isActive: false,
  },
  {
    id:"2",
    name:"Индия",
    isActive: false,
  },
  {
    id:"3",
    name:"Великобритания",
    isActive: false,
  },
]

const CountryFilter = () => {
  const [links,setLinks] = useState(buttons);

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
    let style = "country-filter__link "
    
    if(link.isActive){
      style += "active "
    }
    
    return <Button  key={link.id} id={link.id} name={link.name} toggleActive={toggleActive} styles={style}/>
  })

  return (
    <div className="country-filter-container">
      <ul className="country-filter__list">
        {result}
      </ul>
  </div>
  )
}

export default CountryFilter;