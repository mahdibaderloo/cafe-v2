interface Item {
  id: number;
  bg: string;
  icon: string;
  text: string;
}

type ItemProp = { item: Item };

export default function ContactUsItem({ item }: ItemProp) {
  return (
    <li className="flex flex-col items-center w-[30%]">
      <div
        className={`w-15.5 h-15.5 flex items-center justify-center border-3 border-[#4C3D34] ${item.bg} shadow-[0px_3px_4.6px_0px_#00000066] rounded-2xl`}
      >
        <img
          src={item.icon}
          alt="icon"
          className={`${item.id === 2 ? "w-7" : "w-9"}`}
        />
      </div>
      <p className="text-white text-[0.7rem] font-light mt-1.5">{item.text}</p>
    </li>
  );
}
