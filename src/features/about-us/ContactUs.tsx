import phoneIcon from "../../assets/images/phone.svg";
import locationIcon from "../../assets/images/location.svg";
import instagramIcon from "../../assets/images/instagram.svg";

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
    bg: "bg-[linear-gradient(180deg,rgba(17,51,85,0.87)_0%,rgba(126,223,178,0.93)_50%,#4FB286_100%)]",
    icon: phoneIcon,
    text: "تلفن",
  },
  {
    id: 2,
    bg: "bg-[linear-gradient(180deg,rgba(17,51,85,0.97)_0%,#7FB7E6_49.52%,#4A90E2_100%)]",
    icon: locationIcon,
    text: "آدرس",
  },
  {
    id: 3,
    bg: "bg-[linear-gradient(180deg,#833AB4_0%,#FD1D1D_50%,#FCB045_100%)]",
    icon: instagramIcon,
    text: "اینستاگرام",
  },
];

export default function ContactUs() {
  return (
    <div>
      <p className="text-white text-sm">ارتباط با ما</p>
      <ul className="flex items-center justify-center gap-4">
        <li className="flex flex-col items-center">
          <div className="border-3 border-[#4C3D34] bg-[linear-gradient(180deg,rgba(17,51,85,0.87)_0%,rgba(126,223,178,0.93)_50%,#4FB286_100%)] shadow-[0px_3px_4.6px_0px_#00000066] rounded-xl p-2">
            <img src={phoneIcon} alt="icon" />
          </div>
          <p className="text-white text-[0.75rem] font-light mt-1">تلفن</p>
        </li>
      </ul>
    </div>
  );
}
