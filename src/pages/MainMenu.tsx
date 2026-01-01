import MainMenuNav from "../features/main-menu/MainMenuNav";
import { useItems } from "../hooks/useItems";

import cartIcon from "../assets/images/cart.svg";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export default function MainMenu() {
  const { data: items = [], isLoading } = useItems();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full flex h-screen overflow-hidden">
      <div className="w-[75%] bg-[linear-gradient(350.98deg,#738E7F_37.99%,#4C3D34_102.51%)] overflow-scroll">
        <ul className="flex flex-col gap-3 my-3">
          {items.map((item) => {
            const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${item.category}-drink/${item.image}`;
            return (
              <li
                key={item.id}
                className="bg-[linear-gradient(304.79deg,#748F80_-6.47%,#503D32_108.97%)] mx-2 py-2 px-3 rounded-3xl flex h-32"
              >
                <div>
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-full mt-6"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-white flex flex-col justify-center items-center gap-2 mb-4 mt-2 font-medium">
                    <p className="text-[0.9rem] text-center">{item.product}</p>
                    <p className="text-[0.7rem]">
                      {item.price.toLocaleString()}
                    </p>
                  </div>
                  <button className="flex items-center justify-center gap-0.5 bg-(--green-color) w-22 h-6 rounded-lg">
                    <span className="text-[0.52rem] font-semibold text-white">
                      افزودن به{" "}
                    </span>
                    <img
                      src={cartIcon}
                      alt="icon"
                      className="rotate-y-180 w-4"
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <MainMenuNav />
    </div>
  );
}
