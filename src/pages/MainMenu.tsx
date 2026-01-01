import MainMenuNav from "../features/main-menu/MainMenuNav";
import { useItems } from "../hooks/useItems";

import MenuItems from "../features/main-menu/MenuItems";
import { useCategoryStore } from "../store/categoryStore";
import Lines from "../features/main-menu/Lines";

export default function MainMenu() {
  const { data: items = [], isLoading } = useItems();
  const { lines } = useCategoryStore();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full flex h-screen overflow-hidden">
      {lines.length > 0 ? <Lines /> : <MenuItems items={items} />}
      <MainMenuNav />
    </div>
  );
}
