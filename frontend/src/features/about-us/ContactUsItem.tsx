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
          className={`w-20 h-20 sm:w-26 sm:h-26 flex items-center justify-center border-3 border-[#4C3D34] ${item.bg} shadow-[0px_3px_4.6px_0px_#00000066] rounded-2xl sm:rounded-3xl`}
        >
          <img
            src={item.icon}
            alt="icon"
            className={`${item.id === 2 ? "w-8 sm:w-12" : "w-10 sm:w-16"}`}
          />
        </div>
        <p className="text-white text-sm sm:text-md font-medium mt-3 sm:mt-4">
          {item.text}
        </p>
      </a>
    </li>
  );
}
