export default function DiscountsTableHeader() {
  return (
    <li className="flex bg-[#485158] w-full">
      <div className="w-1/3 px-4 py-2 text-white border-l-2 border-[#f4f4f4] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          کد تخفیف
        </p>
      </div>
      <div className="w-1/3 px-4 py-2 text-white border-l-2 border-[#f4f4f4] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          مقدار تخفیف
        </p>
      </div>
      <div className="w-1/3 px-4 py-2 text-white flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          وضعیت
        </p>
      </div>
    </li>
  );
}
