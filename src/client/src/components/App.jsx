import React from "react";
import {
   createBrowserRouter,
   RouterProvider,
 } from "react-router-dom";
 import HomePage from "./pages/HomePage"
 import ProductDetailPage from "./pages/ProductDetailPage";


 const router = createBrowserRouter([
   {
     path: "/",
     element: <HomePage />,
   },
   {
     path: "/products/:productId",
     element: <ProductDetailPage />,
    //  loader: productLoader
   },
 ]);


export default function App() { 
   return (<RouterProvider router={router} />);
}
