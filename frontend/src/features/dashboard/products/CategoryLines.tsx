import { useLines } from "../../../hooks/useLines";
import { useCategoryStore } from "../../../store/categoryStore";
import type { Category } from "../../../types/category.type";
import CategoryLine from "./CategoryLine";

export default function CategoryLines() {
  const { setLine, setCategory } = useCategoryStore();
  const { data: lines, isLoading } = useLines();

  function handleSetCategory(category: number) {
    setCategory(category);
    setLine(null);
  }

  if (isLoading) return <p>loading...</p>;

  return (
    <ul className="flex items-center gap-2 2xl:gap-3 w-full flex-wrap mx-auto mt-4 xl:mt-8">
      {lines.map((line: Category) => (
        <CategoryLine key={line.id} line={line} onclick={handleSetCategory} />
      ))}
    </ul>
  );
}
