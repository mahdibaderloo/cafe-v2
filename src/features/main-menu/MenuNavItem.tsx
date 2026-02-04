import { useCategoryStore } from "../../store/categoryStore";

interface NavProps {
  image: string;
  category: {
    id: string;
    label: string;
    image?: string;
    dbCategories: string[];
  };
}

export default function MenuNavItem({ image, category }: NavProps) {
  const { setCategory, setLines } = useCategoryStore();

  function handleSetCategory(key: string[]) {
    if (key.length > 1) {
      setLines(key);
    } else {
      setCategory(key[0]);
      setLines([]);
    }
  }

  return (
    <li
      key={category.label}
      className="w-full mt-0.5 bg-(--green-color) p-0.5 pb-1 rounded-xl overflow-hidden flex flex-col justify-center items-center gap-1"
      onClick={() => handleSetCategory(category.dbCategories)}
    >
      <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-full h-fit p-1 flex justify-center items-center">
        <img src={image} alt="category-image" className="" />
      </div>
      <p className="text-[0.48rem] text-white font-medium">{category.label}</p>
    </li>
  );
}
