import CategoryLines from "../../features/dashboard/products/CategoryLines";
import Items from "../../features/dashboard/products/Items";
import { useItems } from "../../hooks/items/useItems";
import { useCategoryStore } from "../../store/categoryStore";
import backIcon from "../../assets/images/back.svg";
import { Link } from "react-router-dom";
import useModalStore from "../../store/modal";

export default function ProductsItems() {
  const { data: items, isLoading } = useItems();
  const { line } = useCategoryStore();
  const { openModal, setType } = useModalStore();

  if (isLoading) return <p>Loading...</p>;

  function handleOpenModal() {
    setType("add-item");
    openModal();
  }

  return (
    <div className="mt-4 xl:mt-8 2xl:mt-12 w-[75%] 2xl:w-280 mx-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="w-full flex justify-between lg:pl-0.5 xl:pl-1 2xl:pl-3">
          {!line && (
            <button
              onClick={handleOpenModal}
              className="self-end flex items-center gap-2 text-xs xl:text-[1rem] 2xl:text-lg text-white bg-[#748F80] lg:cursor-pointer w-fit px-3 py-2 xl:px-4 xl:py-3 rounded-lg shadow-md"
            >
              <p>افزودن محصول</p>
            </button>
          )}
          <Link
            to="/dashboard/products"
            className="self-end flex items-center gap-2 text-xs xl:text-[1rem] 2xl:text-lg text-white bg-[#748F80] lg:cursor-pointer w-fit px-3 py-2 xl:px-4 xl:py-3 rounded-lg shadow-md"
          >
            <p>دسته بندی ها</p>
            <img src={backIcon} alt="back-icon" className="w-3 xl:w-4" />
          </Link>
        </div>
        {line ? <CategoryLines /> : <Items items={items!} />}
      </div>
    </div>
  );
}
