import React from "react";
import {
   createBrowserRouter,
   RouterProvider,
 } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ProductDetailPage from "./pages/ProductDetailPage";
// Admin pages just for test here
import AdminCreateCategoryPage from "./admin_pages/AdminCreateCategoryPage";
import AdminUpdateCategoryPage from "./admin_pages/AdminUpdateCategoryPage";
import AdminCategoriesPage from "./admin_pages/AdminCategoriesPage";
import AdminCreateProductPage from "./admin_pages/AdminCreateProductPage";
import AdminProductsPage from "./admin_pages/AdminProductsPage";
import AdminRoot from "./admin_pages/AdminRoot";


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
    path: "/admin/",
    element: <AdminRoot />,
    children: [
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
      {
        path: "/admin/products/",
        element: <AdminProductsPage />,
      },
    ]
   },
 ]);


export default function App() { 
   return (<RouterProvider router={router} />);
}
