import MainMenuNav from "../features/main-menu/MainMenuNav";
import { useItems } from "../hooks/useItems";

import MenuItems from "../features/main-menu/MenuItems";
import { useCategoryStore } from "../store/categoryStore";
import Lines from "../features/main-menu/Lines";
import VerticalMenu from "../components/VerticalMenu";
import { useState } from "react";

export default function MainMenu() {
  const { data: items = [], isLoading } = useItems();
  const { lines } = useCategoryStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((t) => !t);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div
        className="w-full flex h-screen overflow-hidden"
        onClick={handleCloseMenu}
      >
        {lines.length > 0 ? <Lines /> : <MenuItems items={items} />}
        <MainMenuNav />
      </div>
      <VerticalMenu isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
    </>
  );
}
