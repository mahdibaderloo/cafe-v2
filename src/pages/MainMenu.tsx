import React, { useState } from "react";
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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((t) => !t);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  function handleToggleDetails(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDetailsOpen((t) => !t);
  }

  function handleCloseDetails() {
    setIsDetailsOpen(false);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div
        className="w-full flex h-screen overflow-hidden"
        onClick={handleCloseMenu}
      >
        <div
          className={`w-full h-full bg-black/65 z-50 fixed ${
            isDetailsOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } transition-all delay-200`}
          onClick={handleCloseDetails}
        />

        {lines.length > 0 ? (
          <Lines />
        ) : (
          <MenuItems
            items={items}
            onToggleDetails={(e) => handleToggleDetails(e)}
          />
        )}
        <MainMenuNav />
        <ItemDetails isDetailsOpen={isDetailsOpen} />
      </div>
      <VerticalMenu isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
    </>
  );
}
