import { Navigate, Outlet } from "react-router-dom";
import { useIsDesktop } from "../hooks/useIsDesktop";

export default function DesktopOnlyRoute() {
  const isDesktop = useIsDesktop();

  if (!isDesktop) return <Navigate to="/" replace />;

  return <Outlet />;
}
