import { Link } from "react-router-dom";
import { useCategoryStore } from "../../store/categoryStore";

interface Category {
  id: string;
  label: string;
  image?: string;
  dbCategories: string[];
}

interface CategoryProps {
  category: Category;
  image: string;
}

export default function HomeCategoryIem({ category, image }: CategoryProps) {
  const { setCategory, setLines } = useCategoryStore();

  function handleSetCategory(key: string[]) {
    if (key.length > 1) {
      setLines(key);
    } else {
      setCategory(key[0]);
      setLines([]);
    }
  }

  return (
    <li
      key={category.label}
      className="w-18 bg-(--green-color) p-0.5 rounded-xl overflow-hidden"
      onClick={() => handleSetCategory(category.dbCategories)}
    >
      <Link to="/menu" className="flex flex-col justify-center items-center">
        <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-17 h-17 flex justify-center items-center">
          <img src={image} alt="coffee" />
        </div>
        <p className="text-[0.625rem] text-white py-1 font-medium">
          {category.label}
        </p>
      </Link>
    </li>
  );
}
