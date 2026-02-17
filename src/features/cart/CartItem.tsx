import plusIcon from "../../assets/images/plus.svg";
import minusIcon from "../../assets/images/minus.svg";
import { itemImageUrl } from "../../utils/imageUrl";

interface Item {
  id: number;
  product: string;
  price: number;
  image: string;
  category: string;
  count: number;
}

interface ItemProp {
  item: Item;
  increase: (id: number) => void;
  decrease: (id: number) => void;
}

export default function CartItem({ item, increase, decrease }: ItemProp) {
  const imageUrl = itemImageUrl(item.category, item.image);
  return (
    <li className="bg-[#4C3D34] rounded-xl sm:rounded-2xl shadow-[0px_3px_4.6px_0px_#00000066] w-full sm:w-[90%] h-18 sm:h-24 overflow-hidden p-1 sm:p-2 flex">
      <div className="bg-[#566C5F] rounded-xl sm:rounded-2xl shadow-[1px_2px_5px_0px_#00000040] w-23 sm:w-26 h-full flex justify-center items-center">
        <img src={imageUrl} alt="item-image" className="w-16 sm:w-18" />
      </div>

      <div className="text-white font-medium w-full flex flex-col justify-center gap-3 sm:gap-4 mr-2 sm:mr-4">
        <p className="text-[0.8rem] sm:text-[1rem] mt-2">{item.product}</p>

        <div className="flex items-center justify-between">
          <p className="text-[0.8rem] sm:text-[1rem]">
            {item.price.toLocaleString()}
          </p>
          <div className="bg-white w-17 h-6 sm:w-24 sm:h-8 mt-auto mr-auto ml-1 rounded-lg flex justify-between items-center p-0.5">
            <img
              src={plusIcon}
              alt="icon"
              className="bg-[#503D32] w-5 sm:w-7 h-full p-1 rounded-[0.4rem]"
              onClick={() => increase(item.id)}
            />
            <span className="text-[#503D32] font-semibold text-sm sm:text-lg">
              {item.count}
            </span>
            <img
              src={minusIcon}
              alt="icon"
              className="bg-[#4B4542] w-5 sm:w-7 h-full p-1 rounded-[0.4rem]"
              onClick={() => decrease(item.id)}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
