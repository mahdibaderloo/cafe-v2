import { useCategories } from "../../hooks/useCategories";
import { CATEGORY_ORDER } from "../../utils/categoriesOrder";
import { categoryImageUrl } from "../../utils/imageUrl";
import MenuNavItem from "./MenuNavItem";

export default function MainMenuNav() {
  const { categories } = useCategories();

  const sortedCategories = [...categories].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.label) - CATEGORY_ORDER.indexOf(b.label),
  );

  return (
    <nav className="bg-[#596D6C] w-22 sm:w-30 overflow-y-scroll shadow-[0px_0px_6px_-1px_#000000E5] py-2 px-1 sm:px-2">
      <ul className="flex flex-col gap-2.5 items-center">
        {sortedCategories.map((category) => {
          const imageUrl = categoryImageUrl(category.image);
          return (
            <MenuNavItem
              key={category.label}
              image={imageUrl}
              category={category}
            />
          );
        })}
      </ul>
    </nav>
  );
}
