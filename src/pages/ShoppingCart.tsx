import { useState } from "react";
import { useNavigate } from "react-router-dom";

import backButton from "../assets/images/back.svg";
import CartDetails from "../features/cart/CartDetails";
import CartItem from "../features/cart/CartItem";
import SubmitBox from "../features/cart/SubmitBox";

export default function ShoppingCart() {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const navigate = useNavigate();

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
      <header className="w-full h-fit flex justify-between items-center p-4">
        <div className="w-[8%]" />
        <h3 className="text-white font-bold">سبد خرید</h3>
        <div
          className="bg-[#14512F] rounded-xl h-7.5 w-7.5 flex justify-center items-center"
          onClick={() => navigate(-1)}
        >
          <img src={backButton} alt="icon" />
        </div>
      </header>

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
