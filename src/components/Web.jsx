import React from "react";
import '../assets/web.scss';
import Header from "./Header";
import Main from "./Main";

function Web() {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <Main />
    
      </div>
    </div>
  );
}

export default Web;
