import { Navigate, Outlet } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";

export default function MobileOnlyRoute() {
  const isMobile = useIsMobile();

  if (!isMobile) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
