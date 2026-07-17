import { Link } from "react-router-dom";
import { useCategoryStore } from "../../store/categoryStore";
import type { Category } from "../../types/category.type";

export default function HomeCategoryIem({ category }: { category: Category }) {
  const { setCategory, setLine } = useCategoryStore();

  function handleSetCategory(id: number) {
    if (id === 3 || id === 4) {
      setLine(id);
    } else {
      setCategory(id);
      setLine(null);
    }
  }

  return (
    <li
      key={category.id}
      className="w-26 sm:w-30 bg-(--green-color) p-1 rounded-xl overflow-hidden"
      onClick={() => handleSetCategory(category.id)}
    >
      <Link to="/menu" className="flex flex-col justify-center items-center">
        <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-24 sm:w-28 h-24 sm:h-28 flex justify-center items-center">
          <img
            src={`http://localhost:8080/uploads/categories/${category.image}`}
            alt="coffee"
            className="sm:w-19"
          />
        </div>
        <p className="text-sm text-white py-1.5 sm:py-1.5">
          {category.name}
        </p>
      </Link>
    </li>
  );
}
