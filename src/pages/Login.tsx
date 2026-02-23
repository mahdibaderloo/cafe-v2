import coffeeImage from "../assets/images/login-pic.png";

export default function Login() {
  return (
    <div className="w-full h-screen bg-[#485158] flex justify-center items-center">
      <div className="flex w-[80%] h-80 bg-white rounded-3xl overflow-hidden">
        <section className="w-[55%] flex flex-col items-center pt-8">
          <h3 className="font-bold text-xl">ورود</h3>
          <form>
            <div className="flex flex-col gap-1 mt-8">
              <label htmlFor="email" className="text-[0.5rem] font-semibold">
                ایمیل
              </label>
              <input
                type="text"
                id="email"
                className="bg-[#F2F2F2] w-45 h-7 border-3 border-[#748F80] rounded-lg outline-none py-0.5 text-[0.6rem]"
                dir="ltr"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-[0.5rem] font-semibold">
                رمز عبور
              </label>
              <input
                type="text"
                id="password"
                className="bg-[#F2F2F2] w-45 h-7 border-3 border-[#748F80] rounded-lg outline-none py-0.5 text-[0.6rem]"
                dir="ltr"
              />
            </div>
            <div className="w-full flex justify-center">
              <button className="bg-[#485158] text-[0.9rem] font-semibold text-white w-30 h-9 rounded-lg mt-8 cursor-pointer">
                ورود
              </button>
            </div>
          </form>
        </section>
        <section className="w-[45%]">
          <img src={coffeeImage} alt="image" className="" />
        </section>
      </div>
    </div>
  );
}
