import { Link } from "react-router-dom";

interface NavProps {
  image: string;
  category: {
    label: string;
    image?: string;
  };
}

export default function MenuNavItem({ image, category }: NavProps) {
  return (
    <li
      key={category.label}
      className="mt-0.5 bg-(--green-color) p-0.5 pb-1 rounded-xl overflow-hidden flex flex-col justify-center items-center"
    >
      <Link to="/" className="flex flex-col items-center gap-1">
        <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-13.5 h-13.5 p-1 flex justify-center items-center">
          <img src={image} alt="category-image" className="" />
        </div>
        <p className="text-[0.48rem] text-white font-medium">
          {category.label}
        </p>
      </Link>
    </li>
  );
}
