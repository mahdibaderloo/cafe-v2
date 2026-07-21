import type { Item } from "../../../types/item.type";
import itemIcon from "../../../assets/images/dashboard-item.svg";
import useModalStore from "../../../store/modal";
import { useProductStore } from "../../../store/productStore";

export default function Item({ item }: { item: Item }) {
  const { openModal } = useModalStore();
  const { setItem } = useProductStore();

  function handleClickItem() {
    setItem(item);
    openModal();
  }

  return (
    <li
      className="bg-[#748F80] flex items-center justify-between w-[49%] 2xl:w-[32%] p-0.5 xl:p-1 rounded-lg text-white text-xs xl:text-sm 2xl:font-medium lg:cursor-pointer shadow-md"
      onClick={handleClickItem}
    >
      <div className="bg-[#B7B7B7] rounded-lg w-8 h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 flex justify-center items-center">
        <img src={itemIcon} alt={item.productName} className="w-3 xl:w-4" />
      </div>
      <p className="xl:text-[1rem] 2xl:text-lg">{item.productName}</p>
      <span />
    </li>
  );
}
