const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function categoryImageUrl(value: string) {
  const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/categories/${value}`;
  return imageUrl;
}

export function itemImageUrl(category: string, image: string) {
  let value = "";

  if (
    category === "sadsadRobosta" ||
    category === "sadArabica" ||
    category === "vaftad30Robosta" ||
    category === "vaftad30Arabica"
  ) {
    value = "hot-coffee";
  }

  if (
    category === "coldCoffee_100r" ||
    category === "coldCoffee_7030r" ||
    category === "coldCoffee_7030a" ||
    category === "coldCoffee_100a"
  ) {
    value = "cold-coffee";
  }

  if (category === "hot") {
    value = "hot-drink";
  }

  if (category === "cold") {
    value = "cold-drink";
  }

  if (category === "bubbleTea") {
    value = "bubble-tea";
  }

  if (category === "shake" || category === "cake" || category === "snack") {
    value = category;
  }

  if (category === "tea_1" || category === "tea_2") {
    value = "tea";
  }

  const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${value}/${image}`;
  return imageUrl;
}
