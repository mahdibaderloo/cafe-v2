import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../types/category.type";
import MenuNavItem from "./MenuNavItem";

export default function MainMenuNav() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <p>Loading...</p>;

  return (
    <nav className="bg-[#596D6C] w-32 sm:w-36 overflow-y-scroll shadow-[0px_0px_6px_-1px_#000000E5] py-2 px-1 sm:px-2">
      <ul className="flex flex-col gap-2.5 items-center">
        {categories.map((category: Category) => {
          return <MenuNavItem key={category.id} category={category} />;
        })}
      </ul>
    </nav>
  );
}
