interface Item {
  item: {
    id: number;
    label: string;
    icon: string;
  };
}

export default function MenuItem({ item }: Item) {
  return (
    <li className="flex flex-col gap-1 items-center justify-center mt-0.5 w-10.5 overflow-hidden">
      <div className="bg-[#596D6C] p-2 rounded-lg w-8.5 h-8.5 shadow-[0px_1px_2px_0px_#00000073] flex items-center justify-center">
        <img
          src={item.icon}
          alt="icon"
          className={`${item.id === 4 ? "w-4.5" : "w-5"}`}
        />
      </div>
      <p className="text-[0.5rem] text-white font-medium">{item.label}</p>
    </li>
  );
}
