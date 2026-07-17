import plusIcon from "../../assets/images/plus.svg";
import minusIcon from "../../assets/images/minus.svg";
import type {Item} from "../../types/item.type.ts";

interface ItemProp {
  item: Item;
  increase: (id: number) => void;
  decrease: (id: number) => void;
}

export default function CartItem({ item, increase, decrease }: ItemProp) {
  // const imageUrl = itemImageUrl(item.category, item.image);
  return (
    <li className="bg-[#4C3D34] rounded-xl sm:rounded-2xl shadow-[0px_3px_4.6px_0px_#00000066] w-full sm:w-[90%] h-22 sm:h-24 overflow-hidden p-1 sm:p-2 flex">
      <div className="bg-[#566C5F] rounded-xl sm:rounded-2xl shadow-[1px_2px_5px_0px_#00000040] w-26.5 sm:w-28.5 h-full flex justify-center items-center">
        <img src={item.image} alt="item-image" className="w-full h-full" />
      </div>

      <div className="text-white font-medium w-full flex flex-col justify-center gap-4 sm:gap-4 mr-2 sm:mr-4">
        <p className="text-md sm:text-lg mt-2">{item.productName}</p>

        <div className="flex items-center justify-between">
          <p className="text-md sm:text-lg">
            {item.price.toLocaleString()}
          </p>
          <div className="bg-white w-24 h-8 sm:w-28 sm:h-10 mt-auto mr-auto ml-1 mb-1 rounded-lg flex justify-between items-center p-0.5">
            <img
              src={plusIcon}
              alt="icon"
              className="bg-[#503D32] w-7 sm:w-7 h-full p-1 rounded-[0.4rem]"
              onClick={() => increase(item.id)}
            />
            <span className="text-[#503D32] font-semibold text-lg sm:text-xl">
              {item.count}
            </span>
            <img
              src={minusIcon}
              alt="icon"
              className="bg-[#4B4542] w-7 sm:w-7 h-full p-1 rounded-[0.4rem]"
              onClick={() => decrease(item.id)}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
