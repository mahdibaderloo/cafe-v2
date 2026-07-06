import { useCategoryStore } from "../../store/categoryStore";

export default function Lines() {
  const { line, setLine, setCategory } = useCategoryStore();

  function handleSetCategory(category: number) {
    setCategory(category);
    setLine(null);
  }

  return (
    <div className="w-full bg-[linear-gradient(350.98deg,#738E7F_37.99%,#4C3D34_102.51%)]">
      <ul className="flex flex-col gap-3 my-4 sm:mx-8">
        {line.map((l) => {
          return (
            <li
              key={l}
              className="bg-[linear-gradient(304.79deg,#748F80_-6.47%,#503D32_108.97%)] shadow-[0px_2px_6px_0px_#00000040] mx-2 py-2 px-3 rounded-3xl flex justify-center items-center h-18 sm:h-20"
              onClick={() => handleSetCategory(l)}
            >
              <p className="text-white font-medium sm:font-semibold text-[1rem]">
                {setLabel(l)}
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
}
