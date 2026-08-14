import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useModalStore from "../../store/modal";
import closeIcon from "../../assets/images/close.svg";
import { useAddDiscount } from "../../hooks/dashboard/useAddDiscount";
import type { DiscountRequest } from "../../types/dashboard.type";
import { AvanDateTimePicker, AvanProvider } from "@avan-persian/react/client";
import "@avan-persian/themes/default.css";
import "@avan-persian/react/client.css";
import calendarIcon from "../../assets/images/calendar.svg";

export default function ModalAddDiscount() {
  const { closeModal } = useModalStore();
  const { mutate, isPending } = useAddDiscount();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<DiscountRequest>({
    defaultValues: {
      type: "PERCENTAGE",
    },
  });

  const discountType = watch("type");

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
      className="bg-[#485158] rounded-2xl p-6 2xl:p-8 flex flex-col items-center w-150 xl:w-180 2xl:w-240 z-50"
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

          <Controller
            name="type"
            control={control}
            rules={{
              required: "نوع تخفیف را انتخاب کنید",
            }}
            render={({ field }) => (
              <div className="relative w-[90%] md:w-[60%]">
                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-full border-none outline-none pr-4 pl-4 text-sm 2xl:text-lg font-medium shadow text-white text-right flex items-center justify-between lg:cursor-pointer"
                >
                  <span>
                    {field.value === "PERCENTAGE"
                      ? "درصدی"
                      : field.value === "FIXED_AMOUNT"
                        ? "مبلغ ثابت"
                        : "انتخاب نوع تخفیف"}
                  </span>

                  <span
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <ul className="absolute top-full right-0 mt-2 w-full bg-[#485158] rounded-xl overflow-hidden z-50 shadow">
                    <li
                      onClick={() => {
                        field.onChange("PERCENTAGE");
                        setIsOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-white/10 lg:cursor-pointer"
                    >
                      درصدی
                    </li>

                    <li
                      onClick={() => {
                        field.onChange("FIXED_AMOUNT");
                        setIsOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-white/10 lg:cursor-pointer"
                    >
                      مبلغ ثابت
                    </li>
                  </ul>
                )}
              </div>
            )}
          />

          {errors.type && (
            <span className="text-red-300 text-xs">{errors.type.message}</span>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-start mt-4 2xl:mt-10 gap-4 md:gap-0">
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="expire-time">تاریخ انقضا</label>
          <Controller
            name="expiresAt"
            control={control}
            rules={{
              required: "تاریخ انقضا الزامی است",
              validate: (value) => {
                if (!value) return "تاریخ انقضا الزامی است";

                const selectedDate = new Date(value);
                const now = new Date();

                if (selectedDate <= now) {
                  return "تاریخ انقضا باید در آینده باشد";
                }

                return true;
              },
            }}
            render={({ field }) => (
              <AvanProvider dir="rtl" locale="fa-IR">
                <AvanDateTimePicker
                  id="expire-time"
                  className="rounded-xl h-10 xl:h-12 2xl:h-16 border-none outline-none pr-4 text-sm font-rubik 2xl:text-lg font-medium text-white"
                  disabled={isPending}
                  display="popover"
                  numberOfMonths={1}
                  placeholder="انتخاب تاریخ انقضا"
                  value={field.value || null}
                  onChange={field.onChange}
                  hourCycle={24}
                  minuteStep={1}
                  showSeconds={false}
                />
              </AvanProvider>
            )}
          />
          {errors.expiresAt && (
            <span className="text-red-300 text-xs">
              {errors.expiresAt.message}
            </span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 text-[1rem] xl:text-lg 2xl:text-xl text-white w-full">
          <label htmlFor="value">مقدار تخفیف</label>
          <input
            {...register("discountValue", {
              required: "مقدار تخفیف الزامی است",

              valueAsNumber: true,

              validate: (value) => {
                if (Number.isNaN(value)) {
                  return "فقط عدد وارد کنید";
                }

                if (value < 1) {
                  return "حداقل مقدار تخفیف 1 است";
                }

                if (discountType === "PERCENTAGE" && value > 100) {
                  return "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد";
                }

                if (discountType === "FIXED_AMOUNT" && value < 10_000) {
                  return "مبلغ تخفیف باید بیشتر از 10,000 تومان باشد";
                }

                return true;
              },
            })}
            type="number"
            id="value"
            placeholder={
              discountType === "PERCENTAGE" ? "مثال: 20" : "مثال: 100,000"
            }
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
          <label htmlFor="max-usage">تعداد مجاز استفاده</label>
          <input
            {...register("maxUsage", {
              required: "تعداد استفاده الزامی است",
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
            placeholder="مثال: 100"
            className="bg-white/40 rounded-xl h-10 xl:h-12 2xl:h-16 w-[30%] border-none outline-none pr-4 text-sm 2xl:text-lg font-medium shadow text-white placeholder-white/60"
            disabled={isPending}
          />
          {errors.maxUsage && (
            <span className="text-red-300 text-xs">
              {errors.maxUsage.message}
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
