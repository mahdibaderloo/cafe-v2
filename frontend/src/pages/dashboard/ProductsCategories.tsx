import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/items/useCategories";
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
    <ul className="flex gap-4 items-center justify-center flex-wrap lg:w-[90%] 2xl:w-200 mx-auto mt-8 xl:mt-20 2xl:mt-16">
      {categories?.map((category: Category) => (
        <li
          key={category.id}
          onClick={() => handleSetCategory(category.id)}
          className="bg-[#748F80] text-white rounded-xl p-1 w-22 h-32 xl:w-26 xl:h-36 2xl:w-36 2xl:h-46 shadow-md"
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
            <p className="text-xs xl:text-sm 2xl:text-lg mt-1 2xl:mt-0.5 2xl:font-medium">
              {category.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
