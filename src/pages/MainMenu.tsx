import { useState } from "react";
import { useItems } from "../hooks/useItems";
import { useCategoryStore } from "../store/categoryStore";

import MainMenuNav from "../features/main-menu/MainMenuNav";
import MenuItems from "../features/main-menu/MenuItems";
import Lines from "../features/main-menu/Lines";
import VerticalMenu from "../components/VerticalMenu";
import ItemDetails from "../components/ItemDetails";

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
        <ItemDetails />
      </div>
      <VerticalMenu isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
    </>
  );
}
