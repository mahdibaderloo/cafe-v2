import lorax from "../../assets/images/lorax2.png";

interface CartDetailsProps {
  onOpen: () => void;
}

export default function CartDetails({ onOpen }: CartDetailsProps) {
  return (
    <div className="fixed bottom-0 w-full h-[46%] z-10">
      <img src={lorax} alt="icon" className="absolute -top-6.5 right-1" />

      <div className="bg-[#4C3D34] w-full h-full shadow-[0px_-4px_8px_0px_#00000033] rounded-t-2xl px-2 py-6 flex flex-col justify-between">
        <div className="w-[90%] h-10 bg-white rounded-xl p-1 mx-auto flex justify-between items-center z-40">
          <button className="w-[25%] h-full bg-[#503D32] rounded-[0.6rem] text-white font-medium text-[0.8rem]">
            تایید
          </button>
          <input
            type="text"
            className="w-[80%] text-[0.8rem] text-[#503D32] font-medium font-iran-sans outline-none border-none text-left pl-2"
            maxLength={5}
            placeholder="کد تخفیف را وارد کنید"
          />
        </div>

        <div className="p-4 mt-4">
          <div className="flex justify-between items-center text-white text-[0.75rem] font-medium">
            <p>جمع قیمت</p>
            <p>0</p>
          </div>
          <div className="flex justify-between items-center text-white text-[0.75rem] font-medium mt-3">
            <p>تخفیف</p>
            <p>0</p>
          </div>
          <div className="flex justify-between items-center text-white text-[1.1rem] font-medium mt-6">
            <p>مجموع</p>
            <p>0</p>
          </div>
        </div>

        <button
          className="w-[90%] h-10 bg-white shadow-[0px_2px_4px_0px_#00000040] rounded-xl text-[#503D32] font-semibold text-[0.85rem] mt-4 mx-auto"
          onClick={onOpen}
        >
          تایید سفارش
        </button>
      </div>
    </div>
  );
}
