import React from "react"
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import EntryPage from "./EntryPage"
import WorkPage from "./WorkPage"
import ApplicationsTable from "./ApplicationsTable";
import Application from "./Application";

const viser = true;
let routes;
viser ? (
  routes = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<WorkPage/>}  >
      <Route path="all-applications" element={< ApplicationsTable/>}/>
      <Route path="application" element={< Application/>}/>
    </Route>
      
  ))
) : (
  routes = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<EntryPage/>}/>
  ))
)

export {routes};