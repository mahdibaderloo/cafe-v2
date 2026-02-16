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

export default function VerticalMenuItem({ item, onToggleMenu }: Item) {
  return (
    <li className="mt-0.5 w-10.5 sm:w-12" onClick={onToggleMenu}>
      <Link to={item.url} className="flex flex-col items-center gap-1">
        <div className="bg-[#596D6C] p-2 rounded-xl w-8 h-8 sm:w-10 sm:h-10 shadow-[0px_1px_2px_0px_#00000073] flex items-center justify-center">
          <img
            src={item.icon}
            alt={item.label}
            className={item.id === 4 ? "w-4.5 sm:w-5" : "w-5 sm:w-5.5"}
          />
        </div>
        <p className="text-[0.5rem] sm:text-[0.55rem] text-white font-medium">
          {item.label}
        </p>
      </Link>
    </li>
  );
}
