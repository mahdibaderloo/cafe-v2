import { useState } from "react";

interface SubmitProps {
  isSubmitOpen: boolean;
}

export default function SubmitBox({ isSubmitOpen }: SubmitProps) {
  const [isTakeAway, setIsTakeAway] = useState(false);

  return (
    <div
      className={`
        fixed bottom-0 left-0 w-full h-fit
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
      <main className="w-full">
        <div className="w-full flex items-center gap-2 mt-4">
          <p className="text-white text-[0.65rem]">نام و نام خانوادگی:</p>
          <input
            type="text"
            className="bg-[#D9D9D980] w-30 rounded-lg outline-none border-none text-[0.65rem] p-1.5 font-semibold"
          />
        </div>

        <div className="w-full flex items-center gap-2 mt-4">
          <p className="text-white text-[0.65rem]">شماره تماس:</p>
          <input
            type="text"
            className="bg-[#D9D9D980] w-30 rounded-lg outline-none border-none text-[0.65rem] p-1.5 font-semibold"
            maxLength={11}
          />
        </div>

        <div
          className="w-fit flex items-center gap-2 mt-6"
          onClick={() => setIsTakeAway((t) => !t)}
        >
          <div
            className={`w-4 h-4 rounded-full shadow-[0px_2px_4px_0px_#00000047] ${
              isTakeAway
                ? "bg-white border-3 border-white"
                : "border-3 border-white"
            } transition-all delay-100`}
          />
          <p className="text-white text-[0.65rem]">بیرون بر</p>
        </div>

        <div className="w-full flex flex-col gap-2 mt-4">
          <p className="text-white text-[0.75rem]">توضیحات:</p>
          <textarea
            placeholder="مثال: لطفا کمی شکر به قهوه اضافه کنید."
            className="bg-[#D9D9D980] p-2 text-[0.6rem] min-h-24 max-h-24 rounded-xl outline-none border-none font-medium"
            draggable="false"
          ></textarea>
        </div>

        <div className="w-full flex justify-center">
          <button className="w-[90%] h-10 bg-white shadow-[0px_2px_4px_0px_#00000040] rounded-xl text-[#503D32] font-semibold text-[0.85rem] mt-6 mx-auto">
            ثبت سفارش
          </button>
        </div>
      </main>
    </div>
  );
}
