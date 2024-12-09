import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function RequireAdminAuth({ children }) {
  const { user } = useAuth();
  if (!user?.isAdmin) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};