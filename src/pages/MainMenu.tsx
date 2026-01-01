import MainMenuNav from "../features/main-menu/MainMenuNav";
import { useItems } from "../hooks/useItems";

import MenuItems from "../features/main-menu/MenuItems";

export default function MainMenu() {
  const { data: items = [], isLoading } = useItems();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full flex h-screen overflow-hidden">
      <MenuItems items={items} />
      <MainMenuNav />
    </div>
  );
}
