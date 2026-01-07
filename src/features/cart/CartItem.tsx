import { useState } from "react";
import itemImg from "../../assets/images/item.png";
import plusIcon from "../../assets/images/plus.svg";
import minusIcon from "../../assets/images/minus.svg";

export default function CartItem() {
  const [count, setCount] = useState(1);

  function handleIncreaseCount() {
    if (count < 5) {
      setCount((c) => (c = c + 1));
    }
  }

  function handleDecreaseCount() {
    if (count > 1) {
      setCount((c) => (c = c - 1));
    }
  }

  return (
    <li className="bg-[#4C3D34] rounded-xl shadow-[0px_3px_4.6px_0px_#00000066] w-full h-18 overflow-hidden p-1 flex">
      <div className="bg-[#566C5F] rounded-xl shadow-[1px_2px_5px_0px_#00000040] w-23 h-full flex justify-center items-center">
        <img src={itemImg} alt="item-image" className="w-16" />
      </div>

      <div className="text-white font-medium w-full flex flex-col justify-center gap-3 mr-2">
        <p className="text-[0.8rem] mt-2">لیموناد</p>

        <div className="flex items-center justify-between">
          <p className="text-[0.8rem]">150,000</p>
          <div className="bg-white w-17 h-6 mt-auto mr-auto ml-1 rounded-lg flex justify-between items-center p-0.5">
            <img
              src={plusIcon}
              alt="icon"
              className="bg-[#503D32] w-5 h-full p-1 rounded-[0.4rem]"
              onClick={handleIncreaseCount}
            />
            <span className="text-[#503D32] font-semibold text-sm">
              {count}
            </span>
            <img
              src={minusIcon}
              alt="icon"
              className="bg-[#4B4542] w-5 h-full p-1 rounded-[0.4rem]"
              onClick={handleDecreaseCount}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
