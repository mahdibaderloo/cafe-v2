import useModalStore from "../../store/modal";
import closeIcon from "../../assets/images/close.svg";

export default function ModalAddDiscount() {
  const { closeModal } = useModalStore();

  return (
    <form className="bg-[#485158] rounded-2xl p-6 2xl:p-8 flex flex-col items-center w-150 2xl:w-240 z-50">
      <div className="w-full flex items-center justify-between">
        <span />
        <img
          src={closeIcon}
          alt="close-icon"
          className="lg:cursor-pointer"
          onClick={() => closeModal()}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row items-start mt-4 2xl:mt-10">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="code">کد تخفیف</label>
          <input
            type="text"
            id="code"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[60%] border-none outline-none pr-4 font-medium shadow"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="type">نوع تخفیف</label>
          <input
            type="text"
            id="type"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[60%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-start mt-4 2xl:mt-10">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="value">مقدار تخفیف</label>
          <input
            type="text"
            id="value"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[60%] border-none outline-none pr-4 font-medium shadow"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="max-usage">حداکثر استفاده</label>
          <input
            type="text"
            id="max-usage"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[60%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-start mt-4 2xl:mt-10">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="create-time">تاریخ ایجاد</label>
          <input
            type="text"
            id="create-time"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[60%] border-none outline-none pr-4 font-medium shadow"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="used-count">تعداد استفاده شده</label>
          <input
            type="text"
            id="used-count"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[60%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow"
          />
        </div>
      </div>

      <div className="w-full flex items-start mt-4 2xl:mt-10">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="expire-time">تاریخ انقضا</label>
          <input
            type="text"
            id="expire-time"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[30%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow"
          />
        </div>
      </div>

      <div className="flex items-center w-full gap-8 md:gap-30 mt-8 2xl:mt-12">
        <button
          type="button"
          className="bg-[#95999D] text-white hover:bg-[#7c7c80] text-lg 2xl:text-xl px-6 py-2 2xl:px-5 2xl:py-3 rounded-xl transition-all duration-150 lg:cursor-pointer"
        >
          ایجاد کد تخفیف
        </button>
      </div>
    </form>
  );
}
