import { Link } from "react-router-dom";

interface Item {
  item: {
    id: number;
    label: string;
    icon: string;
    url: string;
  };
  onToggleMenu: () => void;
}

export default function MenuItem({ item, onToggleMenu }: Item) {
  return (
    <li className="mt-0.5 w-10.5" onClick={onToggleMenu}>
      <Link to={item.url} className="flex flex-col items-center gap-1">
        <div className="bg-[#596D6C] p-2 rounded-lg w-8.5 h-8.5 shadow-[0px_1px_2px_0px_#00000073] flex items-center justify-center">
          <img
            src={item.icon}
            alt={item.label}
            className={item.id === 4 ? "w-4.5" : "w-5"}
          />
        </div>
        <p className="text-[0.5rem] text-white font-medium">{item.label}</p>
      </Link>
    </li>
  );
}
