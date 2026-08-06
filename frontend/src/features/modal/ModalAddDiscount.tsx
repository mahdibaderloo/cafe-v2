import { useForm } from "react-hook-form";
import useModalStore from "../../store/modal";
import closeIcon from "../../assets/images/close.svg";
import { useAddDiscount } from "../../hooks/dashboard/useAddDiscount";
import type { DiscountRequest } from "../../types/dashboard.type";

export default function ModalAddDiscount() {
  const { closeModal } = useModalStore();
  const { mutate, isPending } = useAddDiscount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiscountRequest>({
    defaultValues: {
      type: "PERCENTAGE",
    },
  });

  function onSubmit(data: DiscountRequest) {
    const discountData = {
      code: data.code,
      type: data.type,
      maxUsage: Number(data.maxUsage),
      discountValue: Number(data.discountValue),
      expiresAt: data.expiresAt,
    };

    mutate(discountData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#485158] rounded-2xl p-6 2xl:p-8 flex flex-col items-center w-150 2xl:w-240 z-50"
    >
      <div className="w-full flex items-center justify-between">
        <span />
        <img
          src={closeIcon}
          alt="close-icon"
          className="lg:cursor-pointer"
          onClick={() => {
            reset();
            closeModal();
          }}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row items-start mt-4 2xl:mt-10 gap-4 md:gap-0">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="code">کد تخفیف</label>
          <input
            {...register("code", {
              required: "کد تخفیف الزامی است",
              minLength: {
                value: 5,
                message: "کد تخفیف باید ۵ کاراکتر باشد",
              },
              maxLength: {
                value: 5,
                message: "کد تخفیف باید ۵ کاراکتر باشد",
              },
            })}
            type="text"
            id="code"
            placeholder="مثال: LIILO"
            maxLength={5}
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[90%] md:w-[60%] border-none outline-none pr-4 font-medium shadow text-white placeholder-white/60"
            disabled={isPending}
          />
          {errors.code && (
            <span className="text-red-300 text-xs">{errors.code.message}</span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="type">نوع تخفیف</label>

          <select
            {...register("type", {
              required: "نوع تخفیف را انتخاب کنید",
            })}
            id="type"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[90%] md:w-[60%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow text-white lg:cursor-pointer"
          >
            <option
              value="PERCENTAGE"
              className="bg-[#485158] text-white lg:cursor-pointer"
            >
              درصدی
            </option>
            <option
              value="FIXED_AMOUNT"
              className="bg-[#485158] text-white lg:cursor-pointer"
            >
              مبلغ ثابت
            </option>
          </select>

          {errors.type && (
            <span className="text-red-300 text-xs">{errors.type.message}</span>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-start mt-4 2xl:mt-10 gap-4 md:gap-0">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="max-usage">تعداد مجاز استفاده</label>
          <input
            {...register("maxUsage", {
              pattern: {
                value: /^[0-9]+$/,
                message: "فقط عدد وارد کنید",
              },
              min: {
                value: 1,
                message: "حداقل ۱ بار استفاده مجاز است",
              },
            })}
            type="text"
            id="max-usage"
            placeholder="مثال: ۱۰۰"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[90%] md:w-[60%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow text-white placeholder-white/60"
            disabled={isPending}
          />
          {errors.maxUsage && (
            <span className="text-red-300 text-xs">
              {errors.maxUsage.message}
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="value">مقدار تخفیف</label>
          <input
            {...register("discountValue", {
              required: "مقدار تخفیف الزامی است",
              pattern: {
                value: /^[0-9]+$/,
                message: "فقط عدد وارد کنید",
              },
              min: {
                value: 1,
                message: "حداقل مقدار تخفیف ۱ است",
              },
              max: {
                value: 100,
                message: "حداکثر مقدار تخفیف ۱۰۰ است",
              },
            })}
            type="text"
            id="value"
            placeholder="مثال: ۲۰"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[90%] md:w-[60%] border-none outline-none pr-4 font-medium shadow text-white placeholder-white/60"
            disabled={isPending}
          />
          {errors.discountValue && (
            <span className="text-red-300 text-xs">
              {errors.discountValue.message}
            </span>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-start mt-4 2xl:mt-10">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="expire-time">تاریخ انقضا</label>
          <input
            {...register("expiresAt", {
              required: "تاریخ انقضا الزامی است",
              validate: {
                futureDate: (value) => {
                  const selectedDate = new Date(value);
                  const now = new Date();
                  if (selectedDate <= now) {
                    return "تاریخ انقضا باید در آینده باشد";
                  }
                  return true;
                },
              },
            })}
            type="datetime-local"
            id="expire-time"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[50%] md:w-[30%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow text-white [&::-webkit-calendar-picker-indicator]:invert"
            disabled={isPending}
          />
          {errors.expiresAt && (
            <span className="text-red-300 text-xs">
              {errors.expiresAt.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center w-full gap-8 md:gap-30 mt-12 2xl:mt-16">
        <button
          type="submit"
          disabled={isPending}
          className={`
            bg-[#95999D] text-white text-lg 2xl:text-xl px-6 py-3 2xl:px-5 2xl:py-3.5 
            rounded-xl transition-all duration-150 
            ${
              isPending
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#7c7c80] lg:cursor-pointer"
            }
            2xl:font-medium
          `}
        >
          {isPending ? "در حال ثبت..." : "ایجاد کد تخفیف"}
        </button>
      </div>
    </form>
  );
}
