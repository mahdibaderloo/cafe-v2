import Header from "../components/Header";
import PreviewItem from "../features/order-preview/PreviewItem";
import EmptyPreview from "../features/order-preview/EmptyPreview";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
export default function OrderPreview() {
  const { items } = useCartStore();

  return (
    <div className="w-full h-screen overflow-hidden bg-[linear-gradient(180deg,#503D32_0%,#738E7F_52.4%)]">
      <Header text="سفارشات ثبت شده" />

      <main className="w-full p-4 h-[54%] sm:pb-6 overflow-scroll">
        <ul className="flex flex-col sm:items-center gap-3 sm:gap-4 pb-8">
          {items.length === 0 ? (
            <EmptyPreview />
          ) : (
            items.map((item) => <PreviewItem key={item.id} item={item} />)
          )}
        </ul>
      </main>
      <footer className="fixed bottom-0 w-full h-fit z-10 bg-[#4C3D34] rounded-t-3xl flex justify-center align-center shadow-[0px_2px_4px_0px_#00000040] pb-6">
        <Link
          to="/print"
          className={`w-[90%] sm:w-[70%] h-14 sm:h-16 bg-white opacity-100" shadow-[0px_2px_4px_0px_#00000040] rounded-xl text-[#503D32] font-semibold text-lg sm:text-xl mt-8 mx-auto`}
        >
          دریافت فاکتور
        </Link>
      </footer>
    </div>
  );
}
