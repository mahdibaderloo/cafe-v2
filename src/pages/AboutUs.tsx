import Header from "../components/Header";
import AboutLiilo from "../features/about-us/AboutLiilo";
import ContactUs from "../features/about-us/ContactUs";
import CopyRight from "../features/about-us/CopyRight";

export default function AboutUs() {
  return (
    <div className="w-full h-screen overflow-hidden bg-[linear-gradient(180deg,#503D32_0%,#738E7F_52.4%)]">
      <Header text="درباره ما" />
      <main className="p-2 pt-0">
        <AboutLiilo />
        <ContactUs />
        <CopyRight />
      </main>
    </div>
  );
}
