import { useCartStore } from "../../store/cartStore";
import { useProductStore } from "../../store/productStore";
import type { ItemResponse } from "../../types/item.type";
import AddToCartButton from "./AddToCartButton";
import ChangeCountButton from "./ChangeCountButton";
import React from "react";

interface ItemProps {
  item: ItemResponse;
  onToggleDetails: (e: React.MouseEvent) => void;
}

export default function MenuItem({ item, onToggleDetails }: ItemProps) {
  const { setItem } = useProductStore();
  const { items } = useCartStore();

  const existingItem = items.find((i) => i.id === item.id);

  function handleSetItem(item: ItemResponse) {
    setItem(item);
  }

  return (
    <li
      className="bg-[linear-gradient(304.79deg,#748F80_-6.47%,#503D32_108.97%)] mx-2 p-3 rounded-3xl flex justify-between sm:gap-4 h-40 sm:h-40"
      onClick={(e) => {
        handleSetItem(item);
        onToggleDetails(e);
      }}
    >
      <div className="w-34 h-34 flex items-center justify-center p-1">
        <img
          src={`http://localhost:8080/uploads/categories/${item.image}`}
          alt="product-image"
          className="w-full"
        />
      </div>
      <div className="w-[50%] flex flex-col justify-between items-center">
        <div className="text-white w-full flex flex-col justify-center items-center gap-4 mb-2 mt-2 font-medium">
          <p className="text-md sm:text-lg text-center">{item.productName}</p>
          <p className="text-md sm:text-lg">{item.price.toLocaleString()}</p>
        </div>
        {existingItem ? (
          <ChangeCountButton id={item.id} />
        ) : (
          <AddToCartButton item={item} />
        )}
      </div>
    </li>
  );
}
