import { useState } from "react";
import { useCategories } from "../hooks/useCategories";

import HorizontalMenu from "../components/HorizontalMenu";
import HomeCategoryIem from "../features/home/HomeCategoryIem";

import mainPic from "../assets/images/main-pic.png";
import coffee from "../assets/images/coffee.png";
import leaf from "../assets/images/leaf.png";
import RouteError from "../components/RouteError";
import type { Category } from "../types/category.type";

export default function Home() {
  const { data: categories, isLoading, isError } = useCategories();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((t) => !t);
  }

  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <RouteError />;

  return (
    <div
      className="w-full bg-[#503C31] h-screen overflow-hidden"
      onClick={handleCloseMenu}
    >
      <header className="w-full">
        <img src={mainPic} alt="main pic" className="w-full" loading="lazy" />
      </header>

      <main className="w-full max-h-[calc(100vh-22%)] bg-[linear-gradient(180deg,#503C31_0%,#748F80_100%)] overflow-scroll">
        <div className="w-[88%] sm:w-[82%] h-16 sm:h-30 bg-[linear-gradient(100.71deg,#705748_29.67%,#14512F_107.09%)] mx-auto mt-2 sm:mt-6 rounded-2xl shadow-[0px_3px_6px_0px_#00000040] overflow-hidden relative flex items-center">
          <img
            src={coffee}
            alt="coffee"
            className="absolute -left-2 -top-1 sm:w-60"
          />
          <img
            src={leaf}
            alt="leaf"
            className="absolute -right-1 -bottom-2 sm:w-24"
          />
          <p className="font-bold text-white absolute text-shadow-lg/30 text-xl sm:text-3xl pr-3 sm:pr-8">
            خرید دون قهوه
          </p>
        </div>

        <ul className="pt-3 sm:pt-7 sm:pb-10 p-4 sm:p-11.5 flex items-center justify-between sm:justify-center gap-x-1 sm:gap-x-3 gap-y-3 flex-wrap">
          {categories.map((category: Category) => {
            return <HomeCategoryIem key={category.id} category={category} />;
          })}
        </ul>
        <div className="w-full h-28 sm:h-48" />
      </main>
      <HorizontalMenu isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />
    </div>
  );
}
