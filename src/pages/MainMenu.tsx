import MainMenuNav from "../features/main-menu/MainMenuNav";

import cartIcon from "../assets/images/cart.svg";

export default function MainMenu() {
  return (
    <div className="w-full flex overflow-hidden">
      <main className="w-[75%] bg-[linear-gradient(350.98deg,#738E7F_37.99%,#4C3D34_102.51%)]">
        <ul className="flex flex-col gap-2.5 overflow-hidden">
          <li className="bg-[linear-gradient(304.79deg,#748F80_-6.47%,#503D32_108.97%)] m-2 py-2 px-3 rounded-3xl flex">
            <div>
              <img src="" alt="product-image" />
            </div>
            <div>
              <div className="text-white flex flex-col justify-center items-center gap-2 mb-4 mt-4 font-medium">
                <p className="text-[1rem]">موهیتو</p>
                <p className="text-[0.7rem]">150,000</p>
              </div>
              <button className="flex items-center justify-center gap-0.5 bg-(--green-color) w-22 h-6 rounded-lg">
                <span className="text-[0.52rem] font-semibold text-white">
                  افزودن به{" "}
                </span>
                <img src={cartIcon} alt="icon" className="rotate-y-180 w-4" />
              </button>
            </div>
          </li>
        </ul>
      </main>
      <MainMenuNav />
    </div>
  );
}
