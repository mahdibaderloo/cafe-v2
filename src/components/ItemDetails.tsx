import itemPic from "../assets/images/item.png";
import lorax from "../assets/images/lorax1.png";
import starFull from "../assets/images/star-fill.svg";
import starEmpty from "../assets/images/star-empty.svg";

export default function ItemDetails() {
  return (
    <div className="h-1/2 w-full bg-[linear-gradient(156.16deg,#566C5F_0%,#503D32_106.49%)] absolute bottom-0 z-50 rounded-t-2xl shadow-[0px_-4px_8px_0px_#00000033]">
      <div className="w-[94%] h-32 mx-auto bg-[linear-gradient(296.82deg,#596d6c99_3.8%,#95a79166_104.47%)] rounded-2xl mt-2 shadow-[0px_3px_12px_0px_#00000033] flex justify-center items-center relative overflow-hidden">
        <p className="bg-[linear-gradient(90deg,#14513111_20.69%,#14512F_62.98%)] p-1 text-white font-semibold rounded-3xl pr-3 w-34 absolute -left-2 bottom-5 tracking-wide">
          150,000
        </p>
        <img src={itemPic} alt="item-image" />
      </div>
      <div className="pr-4 mt-6">
        <p className="text-white font-semibold">لیموناد</p>
        <p className="text-white/80 mt-2 text-[0.75rem]">
          لیمو + نعناع + آب گاز دار
        </p>
      </div>
      <div className="mt-11 flex justify-end">
        <div className="flex flex-col justify-center items-center">
          <div className="flex gap-1 px-3">
            <img src={starEmpty} alt="star" className="w-5.5 " />
            <img src={starFull} alt="star" className="w-6.5 mb-1" />
            <img src={starFull} alt="star" className="w-7.5 mb-2" />
            <img src={starFull} alt="star" className="w-6.5 mb-1" />
            <img src={starFull} alt="star" className="w-5.5 " />
          </div>
          <p className="text-[0.55rem] text-white">( 5 / 4 )</p>
        </div>
        <img src={lorax} alt="lorax" className="absolute -right-3.5 bottom-0" />
      </div>
    </div>
  );
}
