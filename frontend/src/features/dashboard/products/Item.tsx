import type { Item } from "../../../types/item.type";
import itemIcon from "../../../assets/images/dashboard-item.svg";

export default function Item({ item }: { item: Item }) {
  return (
    <li className="bg-[#748F80] flex items-center justify-between w-[49%] p-0.5 2xl:p-1 rounded-lg text-white text-xs 2xl:text-sm 2xl:font-medium lg:cursor-pointer shadow-md">
      <div className="bg-[#B7B7B7] rounded-lg w-8 h-8 2xl:w-10 2xl:h-10 flex justify-center items-center">
        <img src={itemIcon} alt={item.productName} className="w-3 2xl:w-4" />
      </div>
      <p>{item.productName}</p>
      <span />
    </li>
  );
}
