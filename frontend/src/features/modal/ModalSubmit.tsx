import useModalStore from "../../store/modal";

export default function ModalSubmit() {
  const { closeModal } = useModalStore();

  return (
    <div className="bg-[#485158] rounded-2xl p-6 xl:p-8 2xl:p-10 flex flex-col items-center w-100 2xl:w-130 z-50">
      <p className="text-white xl:text-lg 2xl:text-xl 2xl:font-medium">آیا مطمئن هستید؟</p>
      <div className="flex items-center w-full justify-center gap-8 md:gap-30 mt-8 2xl:mt-12">
        <button
          type="submit"
          className="bg-[#407E5C] hover:bg-[#10743D] text-white font-medium text-sm xl:text-lg px-8 py-1.5 xl:px-10 xl:py-2 2xl:px-12 rounded-lg transition-all duration-150 lg:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          تایید
        </button>
        <button
          type="button"
          onClick={() => closeModal()}
          className="bg-[#9F3535] hover:bg-[#790000] text-white font-medium text-sm xl:text-lg px-8 py-1.5 xl:px-10 xl:py-2 2xl:px-12 rounded-lg transition-all duration-150 lg:cursor-pointer"
        >
          لغو
        </button>
      </div>
    </div>
  );
}
