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

export default function HorizontalMenuItem({ item, onToggleMenu }: Item) {
  return (
    <li className="mt-0.5 w-16 sm:w-14" onClick={onToggleMenu}>
      <Link to={item.url} className="flex flex-col items-center gap-1">
        <div className="bg-[#596D6C] p-2 rounded-xl w-11 h-11 sm:w-12 sm:h-12 shadow-[0px_1px_2px_0px_#00000073] flex items-center justify-center">
          <img
            src={item.icon}
            alt={item.label}
            className={item.id === 4 ? "w-6 sm:w-7" : "w-7 sm:w-8.5"}
          />
        </div>
        <p className="text-[0.7rem] sm:text-xs text-white">
          {item.label}
        </p>
      </Link>
    </li>
  );
}
