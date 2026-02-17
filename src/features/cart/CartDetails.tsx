import lorax from "../../assets/images/lorax2.png";
import { useCartStore } from "../../store/cartStore";

interface CartDetailsProps {
  onOpen: () => void;
  itemsCount: number;
}

export default function CartDetails({ onOpen, itemsCount }: CartDetailsProps) {
  const { totalPrice } = useCartStore();

  return (
    <div className="fixed bottom-0 w-full h-fit z-10">
      <img
        src={lorax}
        alt="icon"
        className="absolute -top-6.5 sm:-top-12.5 right-1 sm:right-4 sm:w-34"
      />

      <div className="bg-[#4C3D34] w-full h-full shadow-[0px_-4px_8px_0px_#00000033] rounded-t-2xl px-2 py-6 flex flex-col justify-between">
        <div className="w-[90%] sm:w-[80%] h-10 sm:h-14 bg-white rounded-xl p-1 mx-auto flex justify-between items-center z-40">
          <button className="w-[25%] h-full bg-[#503D32] rounded-[0.6rem] text-white font-medium sm:font-semibold text-[0.8rem] sm:text-[1rem]">
            تایید
          </button>
          <input
            type="text"
            className="w-[80%] text-[0.8rem] sm:text-[1rem] text-[#503D32] font-medium sm:font-semibold sm:tracking-wide font-iran-sans outline-none border-none text-left pl-2"
            maxLength={5}
            placeholder="کد تخفیف را وارد کنید"
          />
        </div>

        <div className="p-4 sm:py-6 sm:px-14 mt-4">
          <div className="flex justify-between items-center text-white text-[0.75rem] sm:text-[1rem] font-medium sm:font-semibold">
            <p>جمع قیمت</p>
            <p>{totalPrice.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-white text-[0.75rem] sm:text-[1rem] font-medium sm:font-semibold mt-3">
            <p>تخفیف</p>
            <p>0</p>
          </div>
          <div className="flex justify-between items-center text-white text-[1.1rem] sm:text-[1.5rem] font-medium sm:font-semibold mt-6">
            <p>مجموع</p>
            <p>{totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <button
          className={`w-[90%] sm:w-[80%] h-10 sm:h-14 bg-white ${itemsCount > 0 ? "opacity-100" : "opacity-50"} shadow-[0px_2px_4px_0px_#00000040] rounded-xl text-[#503D32] font-semibold text-[0.85rem] sm:text-[1.2rem] mt-4 mx-auto`}
          onClick={onOpen}
          disabled={itemsCount === 0}
        >
          تایید سفارش
        </button>
      </div>
    </div>
  );
}
