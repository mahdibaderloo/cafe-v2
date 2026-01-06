import { useProductStore } from "../store/productStore";
import { itemImageUrl } from "../utils/imageUrl";

import lorax from "../assets/images/lorax1.png";
import starFull from "../assets/images/star-fill.svg";
import starEmpty from "../assets/images/star-empty.svg";

interface Details {
  isDetailsOpen: boolean;
}

export default function ItemDetails({ isDetailsOpen }: Details) {
  const { item } = useProductStore();

  return (
    <div
      className={`
        fixed bottom-0 left-0 w-full h-[60%]
        bg-[linear-gradient(156.16deg,#566C5F_0%,#503D32_106.49%)]
        z-50 rounded-t-2xl
        shadow-[0px_-4px_8px_0px_#00000033]
        transition-all duration-300 ease-out
        ${
          isDetailsOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }
      `}
    >
      <div className="w-[94%] h-32 mx-auto bg-[linear-gradient(296.82deg,#596d6c99_3.8%,#95a79166_104.47%)] rounded-2xl mt-2 shadow-[0px_3px_12px_0px_#00000033] flex justify-center items-center relative overflow-hidden">
        <p className="bg-[linear-gradient(90deg,#14513111_20.69%,#14512F_62.98%)] p-1 text-white font-semibold rounded-3xl pr-3 w-34 absolute -left-2 bottom-5 tracking-wide">
          {item?.price.toLocaleString()}
        </p>
        <img src={itemImageUrl(item?.category, item?.image)} alt="item-image" />
      </div>

      <div className="px-4 mt-6 h-[30%]">
        <p className="text-white font-semibold">{item?.product}</p>
        <p className="text-white/80 mt-2 text-[0.75rem]">{item?.desc}</p>
      </div>

      <div className="mt-4 flex justify-end items-end">
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-1 px-3">
            <img src={starEmpty} alt="star" className="w-5.5 " />
            <img src={starFull} alt="star" className="w-6.5 mb-1" />
            <img src={starFull} alt="star" className="w-7.5 mb-2" />
            <img src={starFull} alt="star" className="w-6.5 mb-1" />
            <img src={starFull} alt="star" className="w-5.5 " />
          </div>
          <p className="text-[0.55rem] text-white">( 5 / 4 )</p>
        </div>
        <img src={lorax} alt="lorax" className="absolute -right-3.5 bottom-0" />
      </div>
    </div>
  );
}
