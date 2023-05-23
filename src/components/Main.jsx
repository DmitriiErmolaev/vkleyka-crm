import React from "react";
import "../assets/main.scss";
import CommFilters from "./CommFilters";


const Main = () => {
  return (
    <div className="main-container">
      <CommFilters />
      {/* <CountryFilter /> */}
    </div>
  )
}

export default Main;