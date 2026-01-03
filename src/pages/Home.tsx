import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { categoryImageUrl } from "../utils/imageUrl";

import HorizontalMenu from "../components/HorizontalMenu";
import HomeCategoryIem from "../features/home/HomeCategoryIem";

import mainPic from "../assets/images/main-pic.png";
import coffee from "../assets/images/coffee.png";
import leaf from "../assets/images/leaf.png";
import { CATEGORY_ORDER } from "../utils/categoriesOrder";

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

  const sortedCategories = [...categories].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a.label) - CATEGORY_ORDER.indexOf(b.label)
  );

  return (
    <>
      <div
        className="w-full bg-[#503C31] h-screen overflow-hidden"
        onClick={handleCloseMenu}
      >
        <img src={mainPic} alt="main pic" className="w-full" />
        <div className="w-full h-full bg-[linear-gradient(180deg,#503C31_0%,#748F80_100%)] overflow-scroll pb-42">
          <div className="w-[88%] h-16 bg-[linear-gradient(100.71deg,#705748_29.67%,#14512F_107.09%)] mx-auto mt-2 rounded-2xl shadow-[0px_3px_6px_0px_#00000040] overflow-hidden relative flex items-center">
            <img
              src={coffee}
              alt="coffee"
              className="absolute -left-2 -top-1"
            />
            <img
              src={leaf}
              alt="leaf"
              className="absolute -right-1 -bottom-2"
            />
            <p className="font-bold text-white absolute text-shadow-lg/30 text-xl pr-3">
              خرید دون قهوه
            </p>
          </div>
          <ul className="pt-3 p-4 flex items-center justify-between gap-x-1 gap-y-3 flex-wrap">
            {sortedCategories.map((category) => {
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
