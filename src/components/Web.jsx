import React from "react";
import '../assets/web.scss';
import Header from "./Header";
import Main from "./Main";
import Aside from "./Aside";


function Web() {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <div className="secondary-container">
          <Aside />
          <Main />
        </div>
        
    
      </div>
    </div>
  );
}

export default Web;
