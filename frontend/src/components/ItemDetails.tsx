import { useProductStore } from "../store/productStore";

import lorax from "../assets/images/lorax1.png";
// import starFull from "../assets/images/star-fill.svg";
// import starEmpty from "../assets/images/star-empty.svg";

interface Details {
  isDetailsOpen: boolean;
}

export default function ItemDetails({ isDetailsOpen }: Details) {
  const { item } = useProductStore();

  return (
    <div
      className={`
        fixed bottom-0 left-0 w-full h-[42%] sm:h-[50%] sm:pb-4
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
      <div className="w-[94%] h-40 sm:h-60 mx-auto bg-[linear-gradient(296.82deg,#596d6c99_3.8%,#95a79166_104.47%)] rounded-2xl mt-2 sm:mt-4 shadow-[0px_3px_12px_0px_#00000033] flex justify-center items-center relative overflow-hidden">
        <p className="bg-[linear-gradient(90deg,#14513111_20.69%,#14512F_62.98%)] p-1 text-white font-semibold rounded-3xl sm:rounded-4xl pr-3 w-50 sm:w-[50%] py-3 sm:py-4 absolute -left-6 bottom-5 tracking-wide text-lg sm:text-xl">
          {item?.price.toLocaleString()}
        </p>
        <img src={item?.image} alt="item-image" className="sm:w-50" />
      </div>

      <div className="px-4 sm:px-6 mt-6 h-[28%] sm:h-34">
        <p className="text-white text-lg sm:text-xl font-semibold">
          {item?.productName}
        </p>
        <p className="text-white/80 mt-4 text-sm sm:text-[1rem]">
          {!item?.description || item?.description === "nan"
            ? ""
            : item?.description}
        </p>
      </div>

      <div className="mt-4 sm:mt-0 flex justify-end items-end">
        {/* <div className="flex flex-col justify-center items-center">
          <div className="flex gap-1 px-3">
            <img src={starEmpty} alt="star" className="w-5.5 sm:w-8" />
            <img
              src={starFull}
              alt="star"
              className="w-6.5 sm:w-9 mb-1 sm:mb-3"
            />
            <img
              src={starFull}
              alt="star"
              className="w-7.5 sm:w-10 mb-2 sm:mb-6"
            />
            <img
              src={starFull}
              alt="star"
              className="w-6.5 sm:w-9 mb-1 sm:mb-3"
            />
            <img src={starFull} alt="star" className="w-5.5 sm:w-8" />
          </div>
          <p className="text-[0.55rem] text-white sm:text-sm">( 5 / 4 )</p>
        </div> */}
        <img
          src={lorax}
          alt="lorax"
          className="absolute -right-3.5 sm:-right-4.5 bottom-0 w-30 sm:w-40"
        />
      </div>
    </div>
  );
}
