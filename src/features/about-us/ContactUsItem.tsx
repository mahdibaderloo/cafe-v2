interface Item {
  id: number;
  bg: string;
  icon: string;
  text: string;
  link: string;
}

type ItemProp = { item: Item };

export default function ContactUsItem({ item }: ItemProp) {
  return (
    <li className="w-[30%]">
      <a href={item.link} className="flex flex-col items-center justify-center">
        <div
          className={`w-15.5 h-15.5 sm:w-22 sm:h-22 flex items-center justify-center border-3 border-[#4C3D34] ${item.bg} shadow-[0px_3px_4.6px_0px_#00000066] rounded-2xl sm:rounded-3xl`}
        >
          <img
            src={item.icon}
            alt="icon"
            className={`${item.id === 2 ? "w-7 sm:w-11" : "w-9 sm:w-14"}`}
          />
        </div>
        <p className="text-white text-[0.7rem] sm:text-[0.8rem] sm:font-medium font-light mt-1.5 sm:mt-2">
          {item.text}
        </p>
      </a>
    </li>
  );
}
