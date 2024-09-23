import React from "react";
import TopBar from "../TopBar"
import Carousel from "../Carousel";

export default function HomePage() { 
   return (
      <div className="container">
         <div className="row">
            <div className="col-12">
               <TopBar />
            </div>
         </div>
         <div className="row">
            <div className="col-12">
               <Carousel />
            </div>
         </div>
      </div>
   );
}
