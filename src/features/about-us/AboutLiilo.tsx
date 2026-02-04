import liiloLogo from "../../assets/images/lillo-logo.png";

export default function AboutLiilo() {
  return (
    <section className="fixed w-full flex justify-center top-0 left-1/2 -translate-x-1/2 pointer-events-none">
      <img src={liiloLogo} alt="logo" />
      <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center text-white text-[0.7rem] font-semibold">
        <p>کافه لیلو؛</p>
        <p>هر فنجان، یک سکوت خوش طعم</p>
      </div>
    </section>
  );
}
