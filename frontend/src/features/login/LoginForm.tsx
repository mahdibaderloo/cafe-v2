import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FormValues } from "../../types/dashboard.type";
import { useLogin } from "../../hooks/admin/useLogin";
import eyeOpenIcon from "../../assets/images/eye-open.svg";
import eyeCloseIcon from "../../assets/images/eye-close.svg";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useLogin();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|google|outlook)\.com$/i;

  function handleShowPassword() {
    setShowPassword((t) => !t);
  }

  function onSubmitLogin(data: FormValues) {
    mutate(data);
  }
  return (
    <section className="lg:w-[60%] xl:w-[62%] flex flex-col items-center pt-8 xl:pt-12">
      <h3 className="font-bold text-2xl xl:text-3xl">پنل ادمین</h3>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="flex flex-col gap-1 xl:gap-2 mt-8 xl:mt-10">
          <label htmlFor="email" className="text-md xl:text-xl font-semibold">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "وارد کردن ایمیل الزامی است",
              pattern: {
                value: emailRegex,
                message: "فرمت ایمیل وارد شده صحیح نیست",
              },
            })}
            className="bg-[#F2F2F2] w-60 xl:w-80 h-12 xl:h-16 border-3 border-[#748F80] rounded-lg outline-none mt-2 py-0.5 text-md xl:text-lg xl:px-2 font-semibold font-sans"
            dir="ltr"
          />
          <p className="text-red-600 text-xs xl:text-[1rem]">
            {errors.email?.message}
          </p>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2 mt-6">
          <label
            htmlFor="password"
            className="text-md  xl:text-xl font-semibold"
          >
            رمز عبور
          </label>

          <div className="bg-[#F2F2F2] flex items-center w-60 xl:w-80 h-12 xl:h-16 border-3 border-[#748F80] rounded-lg mt-2">
            <img
              src={showPassword ? eyeOpenIcon : eyeCloseIcon}
              alt="eye-icon"
              className="mr-1 cursor-pointer"
              onClick={handleShowPassword}
            />

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "رمز عبور را وارد کنید",
                minLength: {
                  value: 8,
                  message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
                },
              })}
              className={`w-full outline-none py-0.5 ${showPassword ? "text-md xl:text-lg font-semibold" : "text-md xl:text-lg font-semibold"} tracking-wider px-1 xl:px-2 font-sans`}
              maxLength={20}
              dir="ltr"
            />
          </div>
          <p className="text-red-600 text-xs xl:text-[1rem]">
            {errors.password?.message}
          </p>
        </div>
        <div className="w-full flex justify-center">
          <button
            disabled={isPending}
            className={`${isPending ? "bg-[#9d9e9e] text-lg xl:text-xl" : "bg-[#485158] text-lg xl:text-xl"} font-semibold text-white w-60 h-12 xl:w-80 xl:h-16 rounded-lg mt-18 cursor-pointer`}
          >
            {isPending ? "بررسی اطلاعات..." : "ورود"}
          </button>
        </div>
      </form>
    </section>
  );
}
