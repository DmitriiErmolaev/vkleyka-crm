import React from "react";
import "../assets/main.scss";
import CommFilters from "./CommFilters";
import CountryFilter from "./CountryFilter"
import Request from "../Request";


const Main = () => {
  return (
    <div className="main-container">
      <CommFilters />
      <CountryFilter />
      <Request />
    </div>
  )
}

export default Main;