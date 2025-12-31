import { Outlet } from "react-router-dom";
import Menu from "./components/Menu";
import { useState } from "react";

export default function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((t) => !t);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  return (
    <main className="min-h-screen font-iran-sans" onClick={handleCloseMenu}>
      <Outlet />
      <Menu isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
    </main>
  );
}
