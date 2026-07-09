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
      className="w-14.5 sm:w-20 mt-0.5 bg-(--green-color) p-0.5 pb-1 rounded-xl overflow-hidden flex flex-col justify-center items-center gap-1"
      onClick={() => handleSetCategory(category.id)}
    >
      <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-full h-fit sm:h-19 sm:w-19 p-1 flex justify-center items-center">
        <img
          src={`http://localhost:8080/uploads/categories/${category.image}`}
          alt="category-image"
          className=""
        />
      </div>
      <p className="text-[0.48rem] sm:text-[0.65rem] sm:py-0.5 text-white font-medium">
        {category.name}
      </p>
    </li>
  );
}
