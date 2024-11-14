import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../TopBar"

export default function PageRoot() { 
   return (
      <div className="container">
         <TopBar />
         <Outlet />
      </div>
   );
}
