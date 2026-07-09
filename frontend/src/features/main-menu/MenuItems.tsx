import type { MenuItemsProps } from "../../types/item.type";
import MenuItem from "./MenuItem";

export default function MenuItems({ items, onToggleDetails }: MenuItemsProps) {
  return (
    <div className="w-full bg-[linear-gradient(350.98deg,#738E7F_37.99%,#4C3D34_102.51%)] overflow-scroll">
      <ul className="flex flex-col gap-3 my-3 sm:mx-8">
        {items.map((item) => {
          return (
            <MenuItem
              key={item.id}
              item={item}
              onToggleDetails={onToggleDetails}
            />
          );
        })}
      </ul>
    </div>
  );
}
