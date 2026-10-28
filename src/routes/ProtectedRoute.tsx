import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getRole, getToken, type UserRole } from "../utils/token";

interface Props {
  children: ReactNode;
  requiredRole?: UserRole;
}

export default function ProtectedRoute({ children, requiredRole }: Props) {
  if (!getToken()) return <Navigate to="/" replace />;

  if (requiredRole && getRole() !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}