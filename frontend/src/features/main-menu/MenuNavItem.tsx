import { useCategoryStore } from "../../store/categoryStore";
import type { Category } from "../../types/category.type";

export default function MenuNavItem({ category }: { category: Category }) {
  const { setCategory, setLine } = useCategoryStore();

  function handleSetCategory(id: number) {
    if (id === 3 || id === 4) {
      setCategory(id);
      setLine(id);
    } else {
      setCategory(id);
      setLine(null);
    }
  }

  return (
    <li
      className="w-22 h-28 sm:w-24 mt-0.5 bg-(--green-color) p-1 pb-1 rounded-xl overflow-hidden flex flex-col items-center gap-1"
      onClick={() => handleSetCategory(category.id)}
    >
      <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-full h-20 sm:h-22 p-1 flex justify-center items-center">
        <img
          src={`http://localhost:8080/uploads/categories/${category.image}`}
          alt="category-image"
          className=""
        />
      </div>
      <p className="text-xs sm:text-sm sm:py-0.5 text-white">
        {category.name}
      </p>
    </li>
  );
}
