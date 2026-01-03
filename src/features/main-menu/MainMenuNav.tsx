import { useCategories } from "../../hooks/useCategories";
import { CATEGORY_ORDER } from "../../utils/categoriesOrder";
import { categoryImageUrl } from "../../utils/imageUrl";
import MenuNavItem from "./MenuNavItem";

export default function MainMenuNav() {
  const { categories } = useCategories();

  const sortedCategories = [...categories].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.label) - CATEGORY_ORDER.indexOf(b.label)
  );

  return (
    <nav className="bg-[#596D6C] overflow-scroll w-[25%] flex items-center justify-center shadow-[0px_0px_6px_-1px_#000000E5] py-2">
      <ul className="flex flex-col gap-2.5 pt-4 mt-40">
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
