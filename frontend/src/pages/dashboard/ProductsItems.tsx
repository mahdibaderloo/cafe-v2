import { useItems } from "../../hooks/useItems";

export default function ProductsItems() {
  const { data: items, isLoading } = useItems();

  return <div>item</div>;
}
