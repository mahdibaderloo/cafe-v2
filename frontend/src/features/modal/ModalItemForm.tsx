import closeIcon from "../../assets/images/close.svg";
import itemIcon from "../../assets/images/dashboard-item.svg";

export default function ModalItemForm() {
  return (
    <form className="bg-[#485158] rounded-2xl p-6 2xl:p-8 flex flex-col items-center w-150 z-50">
      <img
        src={closeIcon}
        alt="close-icon"
        className="self-end lg:cursor-pointer"
      />
      <div className="bg-[#D9D9D9] relative flex items-center justify-center w-22 h-22 rounded-2xl cursor-pointer overflow-hidden shadow">
        <img src={itemIcon} alt="profile" className="" />
        <span className="absolute bottom-0 text-[0.6rem] bg-[#676767] text-[#464646] w-full text-center">
          تغییر عکس
        </span>
      </div>

      <div className="w-full flex items-center mt-8 2xl:mt-12">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-xs text-white">
          <label htmlFor="productName">نام محصول</label>
          <input
            type="text"
            id="productName"
            className="bg-white/40 rounded-xl h-10 w-[80%] border-none outline-none pr-4 text-sm shadow"
          />
        </div>
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-xs text-white">
          <label htmlFor="price">قیمت محصول</label>
          <input
            type="text"
            id="price"
            className="bg-white/40 rounded-xl h-10 w-[80%] border-none outline-none pr-4 text-sm shadow"
            inputMode="decimal"
          />
        </div>
      </div>

      <div className="w-full flex items-center mt-8 2xl:mt-12">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-xs text-white">
          <label htmlFor="description">توضیحات</label>
          <textarea
            id="description"
            className="bg-white/40 rounded-xl min-h-20 w-[90%] border-none outline-none p-4 text-sm shadow max-h-30 2xl:max-h-40"
          ></textarea>
        </div>
      </div>

      <div className="flex items-center w-full justify-center gap-30 mt-8 2xl:mt-12">
        <button className="bg-[#407E5C] hover:bg-[#10743D] text-white font-medium text-sm px-8 py-1.5 rounded-lg transition-all duration-150 lg:cursor-pointer">
          ذخیره
        </button>
        <button className="bg-[#9F3535] hover:bg-[#790000] text-white font-medium text-sm px-8 py-1.5 rounded-lg transition-all duration-150 lg:cursor-pointer">
          حذف
        </button>
      </div>
    </form>
  );
}
