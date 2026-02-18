import { useForm, useWatch } from "react-hook-form";
import { useSubmitOrder } from "../../hooks/useSubmitOrder";
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
        <h3 className="text-white font-semibold">ثبت نهایی</h3>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full flex items-center gap-2 mt-4">
          <label className="text-white text-[0.7rem]">
            نام و نام خانوادگی:
          </label>
          <input
            {...register("username", {
              required: "وارد کردن نام الزامی است",
            })}
            className="bg-[#D9D9D980] w-30 rounded-lg outline-none text-[0.7rem] p-1.5 font-semibold"
          />
        </div>
        {errors.username && (
          <p className="text-red-300 text-[0.6rem] mt-1">
            {errors.username.message}
          </p>
        )}

        <div className="w-full flex items-center gap-2 mt-4">
          <label className="text-white text-[0.7rem]">شماره تماس:</label>
          <input
            {...register("mobile", {
              validate: (value) => {
                if (!value) return true;

                const mobileRegex = /^09\d{9}$/;
                return mobileRegex.test(value) || "شماره موبایل معتبر نیست";
              },
            })}
            className="bg-[#D9D9D980] w-30 rounded-lg outline-none text-[0.7rem] p-1.5 font-semibold"
          />
        </div>
        {errors.mobile && (
          <p className="text-red-300 text-[0.6rem] mt-1">
            {errors.mobile.message}
          </p>
        )}

        <div className="w-fit flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            {...register("isTakeAway")}
            className={`appearance-none w-4 h-4 rounded-full shadow-[0px_2px_4px_0px_#00000047] ${isTakeAway ? "bg-white border-3 border-white" : "border-3 border-white"} transition-all delay-100`}
          />
          <p className="text-white text-[0.7rem]">بیرون بر</p>
        </div>

        <div className="w-full flex flex-col gap-2 mt-4">
          <label className="text-white text-[0.75rem]">توضیحات:</label>
          <textarea
            {...register("desc")}
            placeholder="مثال: لطفا کمی شکر به قهوه اضافه کنید."
            className="bg-[#D9D9D980] p-2 text-[0.7rem] min-h-24 max-h-24 rounded-xl outline-none font-medium"
          />
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="w-[90%] h-10 bg-white rounded-xl text-[#503D32] font-semibold text-[0.85rem] mt-6"
          >
            {isPending ? "در حال ثبت..." : "ثبت سفارش"}
          </button>
        </div>
      </form>
    </div>
  );
}
