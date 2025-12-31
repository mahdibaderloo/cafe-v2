import menuIcon from "../assets/images/menu.svg";
import homeIcon from "../assets/images/home.svg";
import cartIcon from "../assets/images/cart.svg";
import aboutUsIcon from "../assets/images/about-us.svg";
import adminIcon from "../assets/images/admin.svg";
import MenuItem from "./MenuItem";

interface MenuProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

const menuItems = [
  { id: 1, label: "صفحه اصلی", icon: homeIcon, url: "/" },
  { id: 2, label: "سبد خرید", icon: cartIcon, url: "/shopping-cart" },
  { id: 3, label: "درباره ما", icon: aboutUsIcon, url: "/about-us" },
  { id: 4, label: "پنل ادمین", icon: adminIcon, url: "/admin" },
];

export default function Menu({ isMenuOpen, onToggleMenu }: MenuProps) {
  return (
    <div
      className="fixed right-2 bottom-2 flex items-start gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-(--green-color) w-10 h-10 flex justify-center items-center rounded-xl shadow-[0px_1px_2px_0px_#00000073] mb-3"
        onClick={onToggleMenu}
      >
        <img src={menuIcon} alt="icon" className="w-6" />
      </div>
      <ul
        className={`flex gap-2 transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        {menuItems.map((item) => {
          return (
            <MenuItem item={item} key={item.id} onToggleMenu={onToggleMenu} />
          );
        })}
      </ul>
    </div>
  );
}
