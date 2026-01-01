import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export default function MainMenuNav() {
  const { categories } = useCategories();

  return (
    <nav className="bg-[#596D6C] overflow-scroll w-[25%] flex items-center justify-center shadow-[0px_0px_6px_-1px_#000000E5] py-3">
      <ul className="flex flex-col gap-2.5">
        {categories.map((category) => {
          const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/categories/${category.image}`;
          return (
            <li
              key={category.label}
              className="mt-0.5 bg-(--green-color) p-0.5 pb-1 rounded-xl overflow-hidden flex flex-col justify-center items-center"
            >
              <Link to="/" className="flex flex-col items-center gap-1">
                <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-13.5 h-13.5 flex justify-center items-center">
                  <img src={imageUrl} alt="{item.label}" className="" />
                </div>
                <p className="text-[0.48rem] text-white font-medium">
                  {category.label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
