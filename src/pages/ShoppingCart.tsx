import { useState } from "react";

import CartDetails from "../features/cart/CartDetails";
import CartItem from "../features/cart/CartItem";
import SubmitBox from "../features/cart/SubmitBox";
import Header from "../components/Header";

export default function ShoppingCart() {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

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
          <CartItem />
        </ul>
      </main>
      <CartDetails onOpen={handleOpenSubmit} />
      <SubmitBox isSubmitOpen={isSubmitOpen} />
    </div>
  );
}
