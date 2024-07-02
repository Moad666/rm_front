// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SideBar from "./components/SideBar";
import KanbanPage from "./pages/KanbanPage"
import BusnessRuleDisplay from "./pages/BusnessRuleDisplay";
import Sidebar2 from "./components/Sidebars/Sidebar2";
import { Outlet } from "react-router-dom";



function Main() {
  return (
    <div style={{display:"flex",width:"100%"}}>
      <div style={{width:"5%"}}>
        <Sidebar2 />
      </div>
      <div style={{width:"95%"}}>
      <Outlet />
      </div>
      
    </div>
  );
}

export default Main;
