import type { Item as ItemProp } from "../../../types/item.type";
import Item from "./Item";

export default function Items({ items }: { items: ItemProp[] }) {
  return (
    <ul className="flex items-center gap-2 xl:gap-3 w-full flex-wrap mx-auto mt-4 xl:mt-8">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
}
