import React from "react";
import {Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ProductDetailPage from "./pages/ProductDetailPage";
// Admin pages
import AdminCreateCategoryPage from "./admin_pages/AdminCreateCategoryPage";
import AdminUpdateCategoryPage from "./admin_pages/AdminUpdateCategoryPage";
import AdminCategoriesPage from "./admin_pages/AdminCategoriesPage";
import AdminCreateProductPage from "./admin_pages/AdminCreateProductPage";
import AdminProductsPage from "./admin_pages/AdminProductsPage";
import AdminRoot from "./admin_pages/AdminRoot";
import AuthProvider from "./hooks/useAuth";
import RequireAuth from "./RequireAuth";


export default function App() { 
   return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={<RequireAuth><AdminRoot /></RequireAuth>}
        >
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="categories/create" element={<AdminCreateCategoryPage />} />
          <Route path="categories/update/:categoryId" element={<AdminUpdateCategoryPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/create" element={<AdminCreateProductPage />} />
        </Route>
      </Routes>
    </AuthProvider>
   );
}
