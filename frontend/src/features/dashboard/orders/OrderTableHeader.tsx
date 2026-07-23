export default function OrderTableHeader() {
  return (
    <li className="flex bg-[#748F80] w-full">
      <div className="w-1/4 px-4 py-2 text-white border-l-2 border-[#587062] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          کد سفارش
        </p>
      </div>
      <div className="w-1/4 px-4 py-2 text-white border-l-2 border-[#587062] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          مشتری
        </p>
      </div>
      <div className="w-1/4 px-4 py-2 text-white border-l-2 border-[#587062] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          مبلغ
        </p>
      </div>
      <div className="w-1/4 px-4 py-2 text-white border-l-2 border-[#748F80] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          شماره تماس
        </p>
      </div>
    </li>
  );
}
