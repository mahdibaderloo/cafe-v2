export default function Summary() {
  return (
    <ul className="flex justify-center flex-wrap gap-4 lg:mt-14 xl:mt-10 2xl:mt-12 w-full xl:w-[90%] mx-auto">
      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">مجموع سفارشات</p>
        <p className="font-semibold text-lg xl:text-2xl">3245</p>
      </li>
      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">میزان فروش این ماه</p>
        <p className="font-semibold text-lg xl:text-2xl">75,000,000</p>
      </li>
      <li className="bg-[#748F80] lg:w-50 xl:w-70 2xl:w-70 h-fit xl:h-32 text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p className="xl:text-lg">پرطرفدار ترین محصول</p>
        <p className="font-semibold text-lg xl:text-2xl">هات چاکلت</p>
      </li>
    </ul>
  );
}
