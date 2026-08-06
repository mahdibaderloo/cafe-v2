import { useForm, useWatch } from "react-hook-form";
import { useSubmitOrder } from "../../hooks/user/useSubmitOrder";
import { useCartStore } from "../../store/cartStore";

interface SubmitProps {
  isSubmitOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  username: string;
  mobile: string;
  desc: string;
  isTakeAway: boolean;
}

export default function SubmitBox({ isSubmitOpen, onClose }: SubmitProps) {
  const { mutate: submitOrder, isPending } = useSubmitOrder();
  const { items, totalPrice, removeAll } = useCartStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      mobile: "",
      desc: "",
      isTakeAway: false,
    },
  });

  const isTakeAway = useWatch({
    control,
    name: "isTakeAway",
  });

  function onSubmit(data: FormValues) {
    submitOrder(
      {
        totalPrice,
        username: data.username.trim(),
        mobile: data.mobile?.trim() || "-",
        order: JSON.stringify(items),
        isTakeAway: data.isTakeAway,
        desc: data.desc,
      },
      {
        onSuccess: () => {
          removeAll();
          reset();
          onClose();
        },
      },
    );
  }

  return (
    <div
      className={`
        fixed bottom-0 left-0 w-full
        bg-[linear-gradient(156.16deg,#566C5F_0%,#503D32_106.49%)]
        z-50 p-4 rounded-t-2xl
        shadow-[0px_-4px_8px_0px_#00000033]
        transition-all duration-300 ease-out
        ${
          isSubmitOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }
      `}
    >
      <header className="w-full flex justify-center">
        <h3 className="text-white font-semibold text-xl sm:text-2xl">
          ثبت نهایی
        </h3>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-8">
        <div className="w-full flex items-center gap-2">
          <label className="text-white text-md sm:text-lg sm:font-semibold w-34 sm:w-44">
            نام و نام خانوادگی :
          </label>
          <input
            {...register("username", {
              required: "وارد کردن نام الزامی است",
            })}
            className="bg-[#D9D9D980] w-48 h-12 sm:w-100 sm:h-14 rounded-lg outline-none text-md sm:text-lg p-1.5 sm:p-2.5 font-semibold"
          />
        </div>
        {errors.username && (
          <p className="text-red-300 text-xs sm:text-sm mt-1">
            {errors.username.message}
          </p>
        )}

        <div className="w-full flex items-center gap-2 mt-4">
          <label className="text-white text-md sm:text-lg sm:font-semibold w-34 sm:w-44">
            شماره تماس :
          </label>
          <input
            {...register("mobile", {
              validate: (value) => {
                if (!value) return true;

                const mobileRegex = /^09\d{9}$/;
                return mobileRegex.test(value) || "شماره موبایل معتبر نیست";
              },
            })}
            className="bg-[#D9D9D980] w-48 h-12 sm:w-100 sm:h-14 rounded-lg outline-none text-md sm:text-lg p-1.5 sm:p-2.5 font-semibold"
          />
        </div>
        {errors.mobile && (
          <p className="text-red-300 text-xs sm:text-sm mt-1">
            {errors.mobile.message}
          </p>
        )}

        <div className="w-fit flex items-center gap-4 mt-6">
          <input
            id="takeAway"
            type="checkbox"
            {...register("isTakeAway")}
            className={`appearance-none w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-[0px_2px_4px_0px_#00000047] ${isTakeAway ? "bg-white border-3 border-white" : "border-3 border-white"} transition-all delay-100`}
          />
          <label
            htmlFor="takeAway"
            className="text-white text-[1rem] sm:text-[1.2rem] sm:font-semibold"
          >
            بیرون بر
          </label>
        </div>

        <div className="w-full flex flex-col gap-2 mt-8">
          <label className="text-white text-md sm:text-lg sm:font-semibold">
            توضیحات:
          </label>
          <textarea
            {...register("desc")}
            placeholder="مثال: لطفا کمی شکر به قهوه اضافه کنید."
            className="bg-[#D9D9D980] p-2 text-sm sm:text-lg min-h-30 max-h-30 sm:min-h-40 sm:max-h-40 rounded-xl outline-none font-medium mt-2 sm:mt-4 sm:w-[84%] sm:mx-auto"
          />
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full sm:w-[84%] h-14 sm:h-16 ${isPending ? "bg-[#d9d9d980]" : "bg-white"} rounded-xl text-[#503D32] font-semibold text-lg sm:text-xl mt-6`}
          >
            {isPending ? "در حال ثبت..." : "ثبت سفارش"}
          </button>
        </div>
      </form>
    </div>
  );
}
