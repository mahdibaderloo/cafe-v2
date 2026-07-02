import plus from "../../assets/images/plus.svg";
import minus from "../../assets/images/minus.svg";
import { useCartStore } from "../../store/cartStore";
import type React from "react";

type ID = number;
type ButtonProp = { id: ID };

export default function ChangeCountButton({ id }: ButtonProp) {
  const { increaseItemCount, decreaseItemCount, items } = useCartStore();
  const count = items.find((item) => item.id === id)?.count;

  function handleIncrease(e: React.MouseEvent) {
    e.stopPropagation();
    increaseItemCount(id);
  }

  function handleDecrease(e: React.MouseEvent) {
    e.stopPropagation();
    decreaseItemCount(id);
  }

  return (
    <button className="flex items-center justify-between bg-white w-20 sm:w-full h-6 sm:h-9 rounded-lg sm:rounded-xl p-0.5">
      <img
        src={plus}
        alt="icon"
        className="bg-(--green-color) h-full w-5 sm:w-8 p-0.5 sm:p-1 rounded-[0.35rem] sm:rounded-[0.6rem]"
        onClick={handleIncrease}
      />
      <span className="text-sm sm:text-[1.4rem] font-semibold">{count}</span>
      <img
        src={minus}
        alt="icon"
        className="bg-[rgba(72,81,88,1)] h-full w-5 sm:w-8 p-0.5 sm:p-1 rounded-[0.35rem] sm:rounded-[0.6rem]"
        onClick={handleDecrease}
      />
    </button>
  );
}
