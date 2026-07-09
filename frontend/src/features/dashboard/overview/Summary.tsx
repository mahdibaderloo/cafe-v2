export default function Summary() {
  return (
    <ul className="flex justify-center flex-wrap gap-4 lg:mt-4 2xl:mt-12">
      <li className="bg-[#748F80] lg:w-50 xl:60 2xl:w-70 h-fit text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p>مجموع سفارشات</p>
        <p className="font-semibold text-lg">3245</p>
      </li>
      <li className="bg-[#748F80] lg:w-50 xl:60 2xl:w-70 h-fit text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p>میزان فروش این ماه</p>
        <p className="font-semibold text-lg">75,000,000</p>
      </li>
      <li className="bg-[#748F80] lg:w-50 xl:60 2xl:w-70 h-fit text-white flex flex-col justify-center items-center gap-4 rounded-xl p-4 shadow-md">
        <p>پرطرفدار ترین محصول</p>
        <p className="font-semibold text-lg">هات چاکلت</p>
      </li>
    </ul>
  );
}
