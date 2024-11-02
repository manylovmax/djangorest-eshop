import React from "react";
import {
   createBrowserRouter,
   RouterProvider,
 } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ProductDetailPage from "./pages/ProductDetailPage";
// Admin pages just for test here
import AdminCreateCategoryPage from "./pages/AdminCreateCategoryPage";
import AdminUpdateCategoryPage from "./pages/AdminUpdateCategoryPage";
import AdminCategoriesPage from "./pages/AdminCategoriesPage";
import AdminCreateProductPage from "./pages/AdminCreateProductPage";


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
   // Admin pages just for test here
   {
     path: "/admin/categories/",
     element: <AdminCategoriesPage />,
   },
   {
     path: "/admin/categories/create",
     element: <AdminCreateCategoryPage />,
   },
   {
     path: "/admin/categories/update/:categoryId",
     element: <AdminUpdateCategoryPage />,
   },
   {
     path: "/admin/products/create",
     element: <AdminCreateProductPage />,
   },
 ]);


export default function App() { 
   return (<RouterProvider router={router} />);
}
