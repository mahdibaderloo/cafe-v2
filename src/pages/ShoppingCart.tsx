import backButton from "../assets/images/back.svg";
import itemImg from "../assets/images/item.png";
import plusIcon from "../assets/images/plus.svg";
import minusIcon from "../assets/images/minus.svg";

export default function ShoppingCart() {
  return (
    <div className="w-full h-screen overflow-hidden bg-[linear-gradient(180deg,#503D32_0%,#738E7F_52.4%)]">
      <header className="w-full h-fit flex justify-between items-center p-4">
        <div className="w-[8%]" />
        <p className="text-white font-bold">سبد خرید</p>
        <div className="bg-[#14512F] rounded-xl h-7.5 w-7.5 flex justify-center items-center">
          <img src={backButton} alt="icon" />
        </div>
      </header>
      <main className="w-full h-fit p-4 mt-8">
        <ul className="flex flex-col gap-2">
          <li className="bg-[#4C3D34] rounded-xl shadow-[0px_3px_4.6px_0px_#00000066] w-full h-18 overflow-hidden p-1 flex">
            <div className="bg-[#566C5F] rounded-xl shadow-[1px_2px_5px_0px_#00000040] w-15 h-full flex justify-center items-center">
              <img src={itemImg} alt="item-image" className="w-14" />
            </div>

            <div className="text-white font-medium w-full flex flex-col justify-center gap-2 mr-4">
              <p className="text-[0.9rem]">لیموناد</p>

              <div className="flex items-center justify-between">
                <p className="text-[0.8rem]">150,000</p>
                <div className="bg-white w-18 h-6 mt-auto mr-auto ml-1 rounded-lg flex justify-between items-center p-0.5">
                  <img
                    src={plusIcon}
                    alt="icon"
                    className="bg-[#503D32] w-5 h-full p-1 rounded-[0.4rem]"
                  />
                  <span className="text-[#503D32] font-semibold text-sm">
                    1
                  </span>
                  <img
                    src={minusIcon}
                    alt="icon"
                    className="bg-[#4B4542] w-5 h-full p-1 rounded-[0.4rem]"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}
