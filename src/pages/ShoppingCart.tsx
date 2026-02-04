import { useState } from "react";
import { useCartStore } from "../store/cartStore";

import CartDetails from "../features/cart/CartDetails";
import CartItem from "../features/cart/CartItem";
import SubmitBox from "../features/cart/SubmitBox";
import Header from "../components/Header";
import EmptyCart from "../features/cart/EmptyCart";

export default function ShoppingCart() {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const { items, increaseItemCount, decreaseItemCount } = useCartStore();

  function handleCloseSubmit() {
    setIsSubmitOpen(false);
  }

  function handleOpenSubmit() {
    setIsSubmitOpen(true);
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-[linear-gradient(180deg,#503D32_0%,#738E7F_52.4%)]">
      <div
        className={`w-full h-full bg-black/65 z-50 fixed ${
          isSubmitOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-all delay-75`}
        onClick={handleCloseSubmit}
      />
      <Header text="سبد خرید" />

      <main className="w-full p-4 h-68 overflow-scroll">
        <ul className="flex flex-col gap-2 pb-8">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increase={increaseItemCount}
                decrease={decreaseItemCount}
              />
            ))
          )}
        </ul>
      </main>
      <CartDetails onOpen={handleOpenSubmit} itemsCount={items.length} />
      <SubmitBox isSubmitOpen={isSubmitOpen} />
    </div>
  );
}
