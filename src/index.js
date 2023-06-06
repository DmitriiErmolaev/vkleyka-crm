import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import './assets/index.scss';
import RoutesComponent from "./components/RoutesComponent"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <RoutesComponent/>
    </Router>
  </React.StrictMode>
);