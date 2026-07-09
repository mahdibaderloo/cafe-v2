import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { FormValues } from "../../types/dashboard.type";
import { useLogin } from "../../hooks/admin/useLogin";
import eyeOpenIcon from "../../assets/images/eye-open.svg";
import eyeCloseIcon from "../../assets/images/eye-close.svg";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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
    setShowPassword((t) => (t === false ? true : false));
  }

  function onSubmitLogin(data: FormValues) {
    mutate(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  }
  return (
    <section className="lg:w-[55%] xl:w-[62%] flex flex-col items-center pt-8 xl:pt-12">
      <h3 className="font-bold text-xl xl:text-3xl">پنل ادمین</h3>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="flex flex-col gap-1 xl:gap-2 mt-8">
          <label htmlFor="email" className="text-sm font-semibold">
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
            className="bg-[#F2F2F2] w-45 xl:w-50 h-7 xl:h-9 border-3 border-[#748F80] rounded-lg outline-none py-0.5 text-[0.6rem] xl:text-[0.65rem] pl-1 font-semibold font-sans"
            dir="ltr"
          />
          <p className="text-red-600 text-[0.6rem]">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-1 xl:gap-2 mt-4 xl:mt-6">
          <label htmlFor="password" className="text-sm font-semibold">
            رمز عبور
          </label>

          <div className="bg-[#F2F2F2] flex items-center w-45 xl:w-50 h-7 xl:h-9 border-3 border-[#748F80] rounded-lg">
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
              className={`w-full outline-none py-0.5 ${showPassword ? "text-[0.6rem] xl:text-[0.65rem] font-semibold" : "text-[0.8rem] xl:text-[1rem] font-semibold"} tracking-wider pl-1 font-sans`}
              maxLength={12}
              dir="ltr"
            />
          </div>
          <p className="text-red-600 text-[0.6rem]">
            {errors.password?.message}
          </p>
        </div>
        <div className="w-full flex justify-center">
          <button
            disabled={isPending}
            className={`${isPending ? "bg-[#9d9e9e] text-[0.7rem] xl:text-[0.8rem]" : "bg-[#485158] text-[0.9rem] xl:text-[1rem]"} font-semibold text-white w-30 h-9 xl:w-32 xl:h-10 rounded-lg mt-8 cursor-pointer`}
          >
            {isPending ? "بررسی اطلاعات..." : "ورود"}
          </button>
        </div>
      </form>
    </section>
  );
}
