import closeIcon from "../../assets/images/close.svg";
import { useDiscount } from "../../hooks/dashboard/useDiscount";
import { useDiscountStore } from "../../store/discountStore";
import useModalStore from "../../store/modal";
import { formatJalaliDate } from "../../utils/date";

export default function ModalDiscountInfo() {
  const { closeModal } = useModalStore();
  const { selectedDiscount } = useDiscountStore();
  const { data, isLoading } = useDiscount(selectedDiscount);

  if (isLoading) return <p>Loading...</p>;

  return (
    <form className="bg-[#485158] rounded-2xl p-6 2xl:p-8 flex flex-col items-center w-150 2xl:w-240 z-50">
      <div className="w-full flex items-center justify-between">
        <p className="font-medium text-white text-lg 2xl:text-2xl">
          کد تخفیف : {data?.code}
        </p>
        <div className="flex items-center gap-8">
          {
            <p
              className={`${data?.isActive ? "bg-[#7A9686] border-2 border-[#2D4336] text-[#10743D]" : "bg-[#D77575] border-2 border-[#790000] text-[#790000]"} rounded-[18px] text-xs xl:text-[1rem] 2xl:text-lg font-medium w-24 2xl:w-34 py-1 2xl:py-2 text-center`}
            >
              {data?.isActive ? "فعال" : "غیر فعال"}
            </p>
          }
          <img
            src={closeIcon}
            alt="close-icon"
            className="lg:cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-start mt-4 2xl:mt-10">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="code">مقدار تخفیف</label>
          <input
            type="text"
            id="code"
            readOnly
            value={`${data?.discountValue} ${data?.type === "PERCENTAGE" ? "%" : "تومان"}`}
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[60%] border-none outline-none pr-4 font-medium shadow"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="max-usage">حداکثر استفاده</label>
          <input
            type="text"
            id="max-usage"
            readOnly
            value={data?.maxUsage}
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
            readOnly
            value={formatJalaliDate(data?.createdAt as string)}
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[60%] border-none outline-none pr-4 font-medium shadow"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="used-count">تعداد استفاده شده</label>
          <input
            type="text"
            id="used-count"
            readOnly
            value={data?.usedCount}
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
            readOnly
            value={formatJalaliDate(data?.expiresAt as string)}
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[30%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow"
          />
        </div>
      </div>

      {data?.isActive && (
        <div className="flex items-center w-full gap-8 md:gap-30 mt-8 2xl:mt-12">
          <button
            type="button"
            className="bg-[#D77575] border-2 border-[#790000] text-[#9F0000] hover:bg-[#b84b4b] font-semibold text-lg 2xl:text-xl px-6 py-2 2xl:px-4 2xl:py-2 rounded-[18px] transition-all duration-150 lg:cursor-pointer"
          >
            غیر فعالسازی
          </button>
        </div>
      )}
    </form>
  );
}
