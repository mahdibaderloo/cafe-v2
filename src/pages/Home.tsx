import mainPic from "../assets/images/main-pic.png";
import HomeCategoryIem from "../features/home/HomeCategoryIem";
import { useCategories } from "../hooks/useCategories";
import { categoryImageUrl } from "../utils/imageUrl";

export default function Home() {
  const { categories, isLoading } = useCategories();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full bg-[#503C31]">
      <img src={mainPic} alt="main pic" className="w-full" />
      <div className="w-full bg-[linear-gradient(180deg,#503C31_0%,#748F80_100%)]">
        <ul className="pt-3 p-4 flex items-center justify-between gap-x-1 gap-y-3 flex-wrap">
          {categories.map((category) => {
            const imageUrl = categoryImageUrl(category.image);
            return (
              <HomeCategoryIem
                key={category.label}
                category={category}
                image={imageUrl}
              />
            );
          })}
        </ul>

        <div className="w-full h-22" />
      </div>
    </div>
  );
}
