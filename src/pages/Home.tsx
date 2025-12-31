import mainPic from "../assets/images/main-pic.png";
import { useCategories } from "../hooks/useCategories";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export default function Home() {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full bg-[#503C31]">
      <img src={mainPic} alt="main pic" className="w-full" />
      <div className="w-full bg-[linear-gradient(180deg,#503C31_0%,#748F80_100%)]">
        <ul className="pt-3 p-4 flex items-center justify-between gap-x-1 gap-y-3 flex-wrap">
          {categories.map((category) => {
            const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/categories/${category.image}`;
            return (
              <li
                key={category.label}
                className="w-18 bg-(--green-color) p-0.5 rounded-xl overflow-hidden flex flex-col justify-center items-center"
              >
                <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-17 h-17 flex justify-center items-center">
                  <img src={imageUrl} alt="coffee" />
                </div>
                <p className="text-[0.625rem] text-white py-1 font-medium">
                  {category.label}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="w-full h-22" />
      </div>
    </div>
  );
}
