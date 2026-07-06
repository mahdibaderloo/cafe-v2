import { useCategories } from "../../hooks/useCategories";
import MenuNavItem from "./MenuNavItem";

export default function MainMenuNav() {
  const { data: categories } = useCategories();

  return (
    <nav className="bg-[#596D6C] w-22 sm:w-30 overflow-y-scroll shadow-[0px_0px_6px_-1px_#000000E5] py-2 px-1 sm:px-2">
      <ul className="flex flex-col gap-2.5 items-center">
        {categories.map((category) => {
          return (
            <MenuNavItem
              key={category.label}
              image={category.image}
              category={category}
            />
          );
        })}
      </ul>
    </nav>
  );
}
