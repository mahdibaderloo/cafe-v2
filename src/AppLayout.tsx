import { Outlet } from "react-router-dom";
import Menu from "./components/Menu";

export default function AppLayout() {
  return (
    <main className="min-h-screen font-iran-sans">
      <Outlet />
      <Menu />
    </main>
  );
}
