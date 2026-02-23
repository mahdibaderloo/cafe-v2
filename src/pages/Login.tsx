import coffeeImage from "../assets/images/login-pic.png";

export default function Login() {
  return (
    <div className="w-full h-screen bg-[#485158] flex justify-center items-center">
      <div className="flex lg:w-[80%] xl:w-200 h-80 xl:h-100 bg-white rounded-3xl overflow-hidden">
        <section className="lg:w-[55%] xl:w-[62%] flex flex-col items-center pt-8 xl:pt-12">
          <h3 className="font-bold text-xl xl:text-3xl">ورود</h3>
          <form>
            <div className="flex flex-col gap-1 xl:gap-2 mt-8">
              <label
                htmlFor="email"
                className="text-[0.5rem] xl:text-[0.65rem] font-semibold"
              >
                ایمیل
              </label>
              <input
                type="text"
                id="email"
                className="bg-[#F2F2F2] w-45 xl:w-50 h-7 xl:h-9 border-3 border-[#748F80] rounded-lg outline-none py-0.5 text-[0.6rem] xl:text-[0.65rem] pl-1 font-semibold font-sans"
                dir="ltr"
              />
            </div>
            <div className="flex flex-col gap-1 xl:gap-2 mt-4 xl:mt-6">
              <label
                htmlFor="password"
                className="text-[0.5rem] xl:text-[0.65rem] font-semibold"
              >
                رمز عبور
              </label>
              <input
                type="text"
                id="password"
                className="bg-[#F2F2F2] w-45 xl:w-50 h-7 xl:h-9 border-3 border-[#748F80] rounded-lg outline-none py-0.5 text-[0.6rem] xl:text-[0.65rem] pl-1 font-semibold font-sans"
                dir="ltr"
              />
            </div>
            <div className="w-full flex justify-center">
              <button className="bg-[#485158] text-[0.9rem] xl:text-[1rem] font-semibold text-white w-30 h-9 xl:w-32 xl:h-10 rounded-lg mt-8 cursor-pointer">
                ورود
              </button>
            </div>
          </form>
        </section>
        <section className="lg:w-[45%] xl:w-[38%]">
          <img src={coffeeImage} alt="image" className="" />
        </section>
      </div>
    </div>
  );
}
