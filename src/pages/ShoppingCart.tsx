import { useState } from "react";

import itemImg from "../assets/images/item.png";
import backButton from "../assets/images/back.svg";
import plusIcon from "../assets/images/plus.svg";
import minusIcon from "../assets/images/minus.svg";
import lorax from "../assets/images/lorax2.png";

export default function ShoppingCart() {
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
    <div className="w-full h-screen overflow-hidden bg-[linear-gradient(180deg,#503D32_0%,#738E7F_52.4%)]">
      <header className="w-full h-fit flex justify-between items-center p-4">
        <div className="w-[8%]" />
        <p className="text-white font-bold">سبد خرید</p>
        <div className="bg-[#14512F] rounded-xl h-7.5 w-7.5 flex justify-center items-center">
          <img src={backButton} alt="icon" />
        </div>
      </header>

      <main className="w-full p-4 h-68 overflow-scroll">
        <ul className="flex flex-col gap-2 pb-8">
          <li className="bg-[#4C3D34] rounded-xl shadow-[0px_3px_4.6px_0px_#00000066] w-full h-19 overflow-hidden p-1 flex">
            <div className="bg-[#566C5F] rounded-xl shadow-[1px_2px_5px_0px_#00000040] w-24.5 h-full flex justify-center items-center">
              <img src={itemImg} alt="item-image" className="w-18" />
            </div>

            <div className="text-white font-medium w-full flex flex-col justify-center gap-3 mr-2">
              <p className="text-[0.8rem] mt-2">لیموناد</p>

              <div className="flex items-center justify-between">
                <p className="text-[0.8rem]">150,000</p>
                <div className="bg-white w-18 h-6 mt-auto mr-auto ml-1 rounded-lg flex justify-between items-center p-0.5">
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
        </ul>
      </main>

      <div className="fixed bottom-0 w-full h-[46%] z-10">
        <img src={lorax} alt="icon" className="absolute -top-6.5 right-1" />

        <div className="bg-[#4C3D34] w-full h-full shadow-[0px_-4px_8px_0px_#00000033] rounded-t-2xl px-2 py-6 flex flex-col justify-between">
          <div className="w-[90%] h-10 bg-white rounded-xl p-1 mx-auto flex justify-between items-center z-40">
            <button className="w-[25%] h-full bg-[#503D32] rounded-[0.6rem] text-white font-medium text-[0.8rem]">
              تایید
            </button>
            <input
              type="text"
              className="w-[80%] text-[0.8rem] text-[#503D32] font-medium font-iran-sans outline-none border-none text-left pl-2"
              maxLength={5}
              placeholder="کد تخفیف را وارد کنید"
            />
          </div>

          <div className="p-4 mt-4">
            <div className="flex justify-between items-center text-white text-[0.75rem] font-medium">
              <p>جمع قیمت</p>
              <p>0</p>
            </div>
            <div className="flex justify-between items-center text-white text-[0.75rem] font-medium mt-3">
              <p>تخفیف</p>
              <p>0</p>
            </div>
            <div className="flex justify-between items-center text-white text-[1.1rem] font-medium mt-6">
              <p>مجموع</p>
              <p>0</p>
            </div>
          </div>

          <button className="w-[90%] h-10 bg-white shadow-[0px_2px_4px_0px_#00000040] rounded-xl text-[#503D32] font-semibold text-[1rem] mt-4 mx-auto">
            تایید سفارش
          </button>
        </div>
      </div>
    </div>
  );
}
