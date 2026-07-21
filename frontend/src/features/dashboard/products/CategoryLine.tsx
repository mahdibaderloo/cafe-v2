import type { CategoryLineProp } from "../../../types/category.type";

export default function CategoryLine({ line, onclick }: CategoryLineProp) {
  return (
    <li
      key={line.id}
      onClick={() => onclick(line.id)}
      className="bg-[#748F80] flex items-center justify-center w-[49%] p-1 xl:p-3 2xl:p-4 rounded-lg text-white text-xs xl:text-lg 2xl:text-xl xl:font-medium lg:cursor-pointer shadow-md"
    >
      <p>{line.name}</p>
    </li>
  );
}
