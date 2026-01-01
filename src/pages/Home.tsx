import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { categoryImageUrl } from "../utils/imageUrl";

import HorizontalMenu from "../components/HorizontalMenu";
import HomeCategoryIem from "../features/home/HomeCategoryIem";

import mainPic from "../assets/images/main-pic.png";

export default function Home() {
  const { categories, isLoading } = useCategories();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((t) => !t);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div
        className="w-full bg-[#503C31] h-screen overflow-hidden"
        onClick={handleCloseMenu}
      >
        <img src={mainPic} alt="main pic" className="w-full" />
        <div className="w-full h-full bg-[linear-gradient(180deg,#503C31_0%,#748F80_100%)] overflow-scroll pb-40">
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
      <HorizontalMenu isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
    </>
  );
}
