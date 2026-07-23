import { Navigate, Outlet } from "react-router-dom";
import { useAdminStore } from "../store/adminStore";

export default function ProtectedRoute() {
  const { isAuthenticated, admin } = useAdminStore();

  if (!isAuthenticated || !admin?.token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}
