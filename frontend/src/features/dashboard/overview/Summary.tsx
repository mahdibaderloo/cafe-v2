import { useStats } from "../../../hooks/dashboard/useStats";

function Spinner() {
  return (
    <div className="size-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  );
}

export default function Summary() {
  const { data, isLoading } = useStats();

  return (
    <ul className="flex justify-center flex-wrap gap-4 lg:mt-14 xl:mt-10 2xl:mt-12 w-full xl:w-[90%] mx-auto">
      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">مجموع سفارشات</p>
        <div className="font-semibold text-lg xl:text-2xl min-h-7 flex items-center">
          {isLoading ? <Spinner /> : data?.totalOrders}
        </div>
      </li>

      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">میزان فروش این ماه</p>
        <div className="font-semibold text-lg xl:text-2xl min-h-7 flex items-center">
          {isLoading ? <Spinner /> : data?.monthlySales?.toLocaleString()}
        </div>
      </li>

      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">پرطرفدارترین محصول</p>
        <div className="font-semibold text-lg xl:text-2xl min-h-7 flex items-center">
          {isLoading ? <Spinner /> : data?.topProduct}
        </div>
      </li>
    </ul>
  );
}
