import type { CategoryLineProp } from "../../../types/category.type";

export default function CategoryLine({ line, onclick }: CategoryLineProp) {
  return (
    <li
      key={line.id}
      onClick={() => onclick(line.id)}
      className="bg-[#748F80] flex items-center justify-center w-[49%] p-1 2xl:p-2 rounded-lg text-white text-xs 2xl:text-sm 2xl:font-medium lg:cursor-pointer shadow-md"
    >
      <p>{line.name}</p>
    </li>
  );
}
