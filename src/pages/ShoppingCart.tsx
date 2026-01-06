import backButton from "../assets/images/back.svg";

export default function ShoppingCart() {
  return (
    <div className="w-full flex h-screen overflow-hidden bg-[linear-gradient(180deg,#503D32_0%,#738E7F_52.4%)]">
      <header className="w-full h-fit flex justify-between items-center p-4">
        <div className="w-[8%]" />
        <p className="text-white font-bold">سبد خرید</p>
        <div className="bg-[#14512F] rounded-xl h-7.5 w-7.5 flex justify-center items-center">
          <img src={backButton} alt="icon" />
        </div>
      </header>
    </div>
  );
}
