import type { CartItemProp } from "../../types/cart.type.ts";

export default function PreviewItem({ item }: CartItemProp) {
  return (
    <li className="bg-[#4C3D34] rounded-xl sm:rounded-2xl shadow-[0px_3px_4.6px_0px_#00000066] w-full sm:w-[72%] h-22 sm:h-28 overflow-hidden p-1.5 sm:p-2 flex">
      <div className="text-white font-medium w-full flex flex-col justify-center gap-2 sm:gap-3 mr-2 sm:mr-4">
        <div className="b">
          <p className="text-sm sm:text-md">{item.productName}</p>
          <p className="text-[0.8rem] sm:text-md border-b-2 border-white/20 w-[50%] pb-1">
            {item.count.toLocaleString()} عدد
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-md">{item.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-[#566C5F] rounded-xl sm:rounded-2xl shadow-[1px_2px_5px_0px_#00000040] w-26.5 sm:w-31 h-full flex justify-center items-center">
        <img src={item.image} alt="item-image" className="w-full h-full" />
      </div>
    </li>
  );
}
