import phoneIcon from "../../assets/images/phone.svg";
import locationIcon from "../../assets/images/location.svg";
import instagramIcon from "../../assets/images/instagram.svg";
import ContactUsItem from "./ContactUsItem";

interface Item {
  id: number;
  bg: string;
  icon: string;
  text: string;
}

type Items = Item[];

const items: Items = [
  {
    id: 1,
    bg: "bg-[linear-gradient(180deg,#833AB4_0%,#FD1D1D_50%,#FCB045_100%)]",
    icon: instagramIcon,
    text: "اینستاگرام",
  },
  {
    id: 2,
    bg: "bg-[linear-gradient(180deg,rgba(17,51,85,0.97)_0%,#7FB7E6_49.52%,#4A90E2_100%)]",
    icon: locationIcon,
    text: "آدرس",
  },
  {
    id: 3,
    bg: "bg-[linear-gradient(180deg,rgba(17,51,85,0.87)_0%,rgba(126,223,178,0.93)_50%,#4FB286_100%)]",
    icon: phoneIcon,
    text: "تلفن",
  },
];

export default function ContactUs() {
  return (
    <div>
      <p className="text-white text-sm mr-2.5">ارتباط با ما</p>
      <ul className="flex items-center justify-center gap-2 mt-4">
        {items.map((item) => (
          <ContactUsItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
