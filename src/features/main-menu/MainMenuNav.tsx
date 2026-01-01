import { useCategories } from "../../hooks/useCategories";
import MenuNavItem from "./MenuNavItem";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export default function MainMenuNav() {
  const { categories } = useCategories();

  return (
    <nav className="bg-[#596D6C] overflow-scroll w-[25%] flex items-center justify-center shadow-[0px_0px_6px_-1px_#000000E5] py-2">
      <ul className="flex flex-col gap-2.5 pt-4 mt-45">
        {categories.map((category) => {
          const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/categories/${category.image}`;
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
