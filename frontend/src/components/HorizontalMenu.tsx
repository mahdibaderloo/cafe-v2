import HorizontalMenuItem from "./HorizontalMenuItem";

import menuIcon from "../assets/images/menu.svg";
import homeIcon from "../assets/images/home.svg";
import cartIcon from "../assets/images/cart.svg";
import aboutUsIcon from "../assets/images/about-us.svg";

interface MenuProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

const menuItems = [
  { id: 1, label: "صفحه اصلی", icon: homeIcon, url: "/" },
  { id: 2, label: "سبد خرید", icon: cartIcon, url: "/shopping-cart" },
  { id: 3, label: "درباره ما", icon: aboutUsIcon, url: "/about-us" },
];

export default function HorizontalMenu({
  isMenuOpen,
  onToggleMenu,
}: MenuProps) {
  return (
    <div
      className="fixed right-4 bottom-1 sm:bottom-2 sm:right-5 flex items-start gap-2 sm:gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-(--green-color) w-14 h-14 sm:w-16 sm:h-16 flex justify-center items-center rounded-2xl shadow-[0px_1px_2px_0px_#00000073] mb-3"
        onClick={onToggleMenu}
      >
        <img src={menuIcon} alt="icon" className="w-8.5 sm:w-9.5" />
      </div>
      <ul
        className={`flex gap-2 sm:gap-3 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        {menuItems.map((item) => {
          return (
            <HorizontalMenuItem
              item={item}
              key={item.id}
              onToggleMenu={onToggleMenu}
            />
          );
        })}
      </ul>
    </div>
  );
}
