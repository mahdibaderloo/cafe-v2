import { useCategoryStore } from "../../store/categoryStore";

export default function Lines() {
  const { lines, setLines, setCategory } = useCategoryStore();

  function handleSetCategory(category: string) {
    setCategory(category);
    setLines([]);
  }

  return (
    <div className="w-[75%] bg-[linear-gradient(350.98deg,#738E7F_37.99%,#4C3D34_102.51%)]">
      <ul className="flex flex-col gap-3 my-4">
        {lines.map((line) => {
          return (
            <li
              key={line}
              className="bg-[linear-gradient(304.79deg,#748F80_-6.47%,#503D32_108.97%)] shadow-[0px_2px_6px_0px_#00000040] mx-2 py-2 px-3 rounded-3xl flex justify-center items-center h-18"
              onClick={() => handleSetCategory(line)}
            >
              <p className="text-white font-medium text-[1rem]">
                {setLabel(line)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function setLabel(line: string) {
  if (line === "sadRobosta") return "۱۰۰ روبوستا";
  if (line === "sadArabica") return "۱۰۰ عربیکا";
  if (line === "vaftad30Robosta") return "۷۰ / ۳۰ روبوستا";
  if (line === "vaftad30Arabica") return "۷۰ / ۳۰ عربیکا";

  if (line === "coldCoffee_100r") return "۱۰۰ روبوستا";
  if (line === "coldCoffee_100a") return "۱۰۰ عربیکا";
  if (line === "coldCoffee_7030r") return "۷۰ / ۳۰ روبوستا";
  if (line === "coldCoffee_7030a") return "۷۰ / ۳۰ عربیکا";

  if (line === "tea_1") return "لیوان";
  if (line === "tea_2") return "فرنچ پرس";
}
