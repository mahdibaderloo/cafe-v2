import CategoryLines from "../../features/dashboard/products/CategoryLines";
import Items from "../../features/dashboard/products/Items";
import { useItems } from "../../hooks/useItems";
import { useCategoryStore } from "../../store/categoryStore";
import backIcon from "../../assets/images/back.svg";
import { Link } from "react-router-dom";

export default function ProductsItems() {
  const { data: items, isLoading } = useItems();
  const { line } = useCategoryStore();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-4 2xl:mt-12">
      <div className="flex flex-col justify-center items-center w-110 2xl:w-180 mx-auto">
        <Link
          to="/dashboard/products"
          className="self-end flex items-center gap-2 text-xs text-white bg-[#748F80] lg:cursor-pointer w-fit px-3 py-2 rounded-lg lg:mr-[60%] 2xl:mr-[34%] shadow-md"
        >
          <p>دسته بندی ها</p>
          <img src={backIcon} alt="back-icon" className="w-3" />
        </Link>
        {line ? <CategoryLines /> : <Items items={items!} />}
      </div>
    </div>
  );
}
