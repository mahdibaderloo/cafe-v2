import { useStats } from "../../../hooks/dashboard/useStats";

export default function Summary() {
  const { data, isLoading } = useStats();

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className="flex justify-center flex-wrap gap-4 lg:mt-14 xl:mt-10 2xl:mt-12 w-full xl:w-[90%] mx-auto">
      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">مجموع سفارشات</p>
        <p className="font-semibold text-lg xl:text-2xl">{data?.totalOrders}</p>
      </li>
      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">میزان فروش این ماه</p>
        <p className="font-semibold text-lg xl:text-2xl">
          {data?.monthlySales.toLocaleString()}
        </p>
      </li>
      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">پرطرفدار ترین محصول</p>
        <p className="font-semibold text-lg xl:text-2xl">{data?.topProduct}</p>
      </li>
    </ul>
  );
}
