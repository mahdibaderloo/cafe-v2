export default function EmptyOrdersRow() {
  return (
    <li className="flex w-full">
      <div className="w-full px-4 py-2 text-red-700 flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          {" "}
          سفارشی ثبت نشده
        </p>
      </div>
    </li>
  );
}
