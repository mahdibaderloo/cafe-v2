import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../types/category.type";
import { useCategoryStore } from "../../store/categoryStore";

export default function ProductsCategories() {
  const { data: categories, isLoading } = useCategories();

  const { setCategory, setLine } = useCategoryStore();

  function handleSetCategory(id: number) {
    if (id === 3 || id === 4) {
      setLine(id);
    } else {
      setCategory(id);
      setLine(null);
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className="flex gap-4 items-center justify-center flex-wrap lg:w-100 2xl:w-160 mx-auto mt-8 2xl:mt-16">
      {categories.map((category: Category) => (
        <li
          key={category.id}
          onClick={() => handleSetCategory(category.id)}
          className="bg-[#748F80] text-white rounded-xl p-1 w-22 h-32 2xl:w-26 2xl:h-38 shadow-md"
        >
          <Link
            to={`/dashboard/products/${category.id}`}
            className="flex flex-col items-center w-full h-full"
          >
            <div className="bg-[#B7B7B7] rounded-lg h-[82%] w-full flex justify-center items-center">
              <img
                src={`http://localhost:8080/uploads/categories/${category.image}`}
                alt={category.name}
                className=""
              />
            </div>
            <p className="text-xs 2xl:text-sm mt-1">{category.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
