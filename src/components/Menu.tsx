import { useState } from "react";

import menuIcon from "../assets/images/menu.svg";
import homeIcon from "../assets/images/home.svg";
import cartIcon from "../assets/images/cart.svg";
import aboutUsIcon from "../assets/images/about-us.svg";
import adminIcon from "../assets/images/admin.svg";
import MenuItem from "./MenuItem";

const menuItems = [
  { id: 1, label: "صفحه اصلی", icon: homeIcon },
  { id: 2, label: "سبد خرید", icon: cartIcon },
  { id: 3, label: "درباره ما", icon: aboutUsIcon },
  { id: 4, label: "پنل ادمین", icon: adminIcon },
];

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggleMenu() {
    setIsMenuOpen((t) => !t);
  }

  return (
    <div className="fixed right-2 bottom-2 flex items-start gap-2">
      <div
        className="bg-(--green-color) w-10 h-10 flex justify-center items-center rounded-xl shadow-[0px_1px_2px_0px_#00000073] mb-3"
        onClick={handleToggleMenu}
      >
        <img src={menuIcon} alt="icon" className="w-6" />
      </div>
      <ul className="flex gap-2">
        {isMenuOpen &&
          menuItems.map((item) => {
            return <MenuItem item={item} key={item.id} />;
          })}
      </ul>
    </div>
  );
}
