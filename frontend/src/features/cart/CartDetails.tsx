import { useState } from "react";
import lorax from "../../assets/images/lorax2.png";
import { useCode } from "../../hooks/user/useCode";
import { useCartStore } from "../../store/cartStore";
import { toast } from "react-hot-toast";
import type { DiscountResponse } from "../../types/dashboard.type";

interface CartDetailsProps {
  onOpen: () => void;
  itemsCount: number;
}

export default function CartDetails({ onOpen, itemsCount }: CartDetailsProps) {
  const { totalPrice, applyDiscount } = useCartStore();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<DiscountResponse | null>(null);
  const { mutate, isPending } = useCode();

  function handleCheckDiscountCode() {
    const trimmedCode = code.trim();

    if (trimmedCode.length === 0) {
      toast.error("کد تخفیف را وارد کنید");
      return;
    }

    if (discount) {
      toast.error("کد تخفیف قابل استفاده نیست");
      return;
    }

    mutate(code.trim(), {
      onSuccess: (discount) => {
        setDiscount(discount);
        applyDiscount(
          discount.code,
          discount.type === "PERCENTAGE" ? "PERCENTAGE" : "FIXED_AMOUNT",
          discount.discountValue,
        );
      },
    });
  }

  const discountAmount = discount
    ? discount.type === "PERCENTAGE"
      ? (totalPrice * discount.discountValue) / 100
      : discount.discountValue
    : 0;

  const finalPrice = Math.max(0, totalPrice - discountAmount);

  return (
    <div className="fixed bottom-0 w-full h-fit z-10">
      <img
        src={lorax}
        alt="icon"
        className="absolute -top-12.5 sm:-top-20.5 right-1 sm:right-18 w-34 sm:w-45"
      />

      <div className="bg-[#4C3D34] w-full h-full shadow-[0px_-4px_8px_0px_#00000033] rounded-t-2xl px-2 py-6 flex flex-col justify-between">
        <div
          className={`w-[90%] sm:w-[70%] h-14 sm:h-16 ${isPending || !!discount ? "bg-[#bbbbbb]" : "bg-white"} rounded-xl p-1 mx-auto flex justify-between items-center z-40`}
        >
          <button
            className={`w-[25%] h-full ${isPending || !!discount ? "bg-[#413f3e]" : "bg-[#503D32]"} rounded-[0.6rem] text-white sm:font-medium text-lg sm:text-xl`}
            disabled={isPending || !!discount}
            onClick={handleCheckDiscountCode}
          >
            تایید
          </button>
          <input
            type="text"
            className="w-[80%] text-lg sm:text-xl text-[#503D32] font-medium sm:font-semibold sm:tracking-wide font-iran-sans outline-none border-none text-left pl-2"
            maxLength={5}
            placeholder="کد تخفیف را وارد کنید"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={isPending || !!discount}
          />
        </div>

        <div className="px-8 py-2 sm:py-8 sm:px-30 mt-6">
          <div className="flex justify-between items-center text-white text-md sm:text-lg font-medium sm:font-semibold">
            <p>جمع قیمت</p>
            <p>{totalPrice.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-white text-md sm:text-lg font-medium sm:font-semibold mt-4 sm:mt-6">
            <p>تخفیف</p>
            <p>{discountAmount.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-white text-xl sm:text-2xl font-medium sm:font-semibold mt-4 sm:mt-6">
            <p>مجموع</p>
            <p>{finalPrice.toLocaleString()}</p>
          </div>
        </div>

        <button
          className={`w-[90%] sm:w-[70%] h-14 sm:h-16 bg-white ${itemsCount > 0 ? "opacity-100" : "opacity-50"} shadow-[0px_2px_4px_0px_#00000040] rounded-xl text-[#503D32] font-semibold text-lg sm:text-xl mt-8 mx-auto`}
          onClick={onOpen}
          disabled={itemsCount === 0}
        >
          تایید سفارش
        </button>
      </div>
    </div>
  );
}
