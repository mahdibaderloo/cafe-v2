export type UiCategory = {
  id: string; // برای UI و route
  label: string; // فارسی
  image: string;
  dbCategories: string[]; // category های دیتابیس
};

export const CATEGORIES: UiCategory[] = [
  {
    id: "hot-coffee",
    label: "قهوه داغ",
    image: "hot-coffee.png",
    dbCategories: [
      "sadRobosta",
      "sadArabica",
      "vaftad30Robosta",
      "vaftad30Arabica",
    ],
  },
  {
    id: "cold-coffee",
    label: "قهوه سرد",
    image: "cold-coffee.png",
    dbCategories: [
      "coldCoffee_100r",
      "coldCoffee_7030r",
      "coldCoffee_7030a",
      "coldCoffee_100a",
    ],
  },
  {
    id: "snack",
    label: "میان وعده",
    image: "snack.png",
    dbCategories: ["snack"],
  },
  {
    id: "hot",
    label: "نوشیدنی داغ",
    image: "hot-drink.png",
    dbCategories: ["hot"],
  },
  {
    id: "cold",
    label: "نوشیدنی سرد",
    image: "cold-drink.png",
    dbCategories: ["cold"],
  },
  {
    id: "shake",
    label: "شیک",
    image: "shake.png",
    dbCategories: ["shake"],
  },
  {
    id: "bubble-tea",
    label: "بابل تی",
    image: "bubble-tea.png",
    dbCategories: ["bubbleTea"],
  },
  {
    id: "tea",
    label: "دمنوش",
    image: "tea.png",
    dbCategories: ["tea_1"],
  },
  {
    id: "cake",
    label: "کیک",
    image: "cake.png",
    dbCategories: ["cake"],
  },
];
