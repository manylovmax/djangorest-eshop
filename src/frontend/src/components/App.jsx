import React from "react";
import {Routes, Route} from "react-router-dom";

import PageRoot from "./pages/PageRoot";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
// Admin pages
import AuthProvider from "./hooks/useAuth";
import RequireAuth from "./RequireAuth";
import RequireAdminAuth from "./RequireAdminAuth";
import AdminRoot from "./admin_pages/AdminRoot";
import AdminCreateCategoryPage from "./admin_pages/AdminCreateCategoryPage";
import AdminUpdateCategoryPage from "./admin_pages/AdminUpdateCategoryPage";
import AdminCategoriesPage from "./admin_pages/AdminCategoriesPage";
import AdminCreateProductPage from "./admin_pages/AdminCreateProductPage";
import AdminUpdateProductPage from "./admin_pages/AdminUpdateProductPage";
import AdminProductsPage from "./admin_pages/AdminProductsPage";
import AdminAttributeCategoriesPage from "./admin_pages/AdminAttributeCategoriesPage";
import AdminCreateAttributeCategoryPage from "./admin_pages/AdminCreateAttributeCategoryPage";
import AdminUpdateAttributeCategoryPage from "./admin_pages/AdminUpdateAttributeCategoryPage";
import AdminAttributeNamesPage from "./admin_pages/AdminAttributeNamesPage";
import AdminCreateAttributeNamePage from "./admin_pages/AdminCreateAttributeNamePage";
import AdminUpdateAttributeNamePage from "./admin_pages/AdminUpdateAttributeNamePage";
import AdminAttributeValuesPage from "./admin_pages/AdminAttributeValuesPage";
import AdminUpdateAttributeValuePage from "./admin_pages/AdminUpdateAttributeValuePage";
import AccountPage from "./pages/AccountPage";
import SignupPage from "./pages/SignupPage";
import UserRoot from "./pages/UserRoot";


export default function App() { 
   return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PageRoot />} >
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/user" element={<RequireAuth><UserRoot /></RequireAuth>} >
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Route>
        <Route
          path="/admin"
          element={<RequireAdminAuth><AdminRoot /></RequireAdminAuth>}
        >
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="categories/create" element={<AdminCreateCategoryPage />} />
          <Route path="categories/update/:categoryId" element={<AdminUpdateCategoryPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/update/:productId" element={<AdminUpdateProductPage />} />
          <Route path="products/create" element={<AdminCreateProductPage />} />
          <Route path="attribute-categories" element={<AdminAttributeCategoriesPage />} />
          <Route path="attribute-categories/create" element={<AdminCreateAttributeCategoryPage />} />
          <Route path="attribute-categories/update/:Id" element={<AdminUpdateAttributeCategoryPage />} />
          <Route path="attribute-names" element={<AdminAttributeNamesPage />} />
          <Route path="attribute-names/create" element={<AdminCreateAttributeNamePage />} />
          <Route path="attribute-names/update/:Id" element={<AdminUpdateAttributeNamePage />} />
          <Route path="attributes-values" element={<AdminAttributeValuesPage />} />
          <Route path="attributes-values/update/:Id" element={<AdminUpdateAttributeValuePage />} />
        </Route>
      </Routes>
    </AuthProvider>
   );
}
