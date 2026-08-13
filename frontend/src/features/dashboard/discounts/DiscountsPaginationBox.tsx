import useModalStore from "../../../store/modal";
import type { DiscountPaginationProps } from "../../../types/dashboard.type";

export default function DiscountsPaginationBox({
  page,
  totalPages = 10,
  onSetPage,
}: DiscountPaginationProps) {
  const { openModal, setType } = useModalStore();

  function handleClickAdd() {
    setType("add-discount");
    openModal();
  }

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index);
    }

    if (page >= totalPages - 3) {
      return ["...", totalPages - 3, totalPages - 2, totalPages - 1];
    }

    if (page <= 2) {
      return [totalPages - 1, "...", 2, 1, 0];
    }

    return [0, "...", page - 1, page, page + 1, "...", totalPages - 1];
  };

  return (
    <div className="w-full bg-[#f3f3f3] px-5 py-3 flex items-center justify-between">
      <button
        type="button"
        className="bg-[#485158] text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition lg:cursor-pointer"
        onClick={handleClickAdd}
      >
        افزودن کد تخفیف
      </button>

      {totalPages > 1 && (
        <div className="flex items-center gap-5">
          <button
            type="button"
            disabled={page === totalPages - 1}
            onClick={() => onSetPage(page + 1)}
            className="disabled:opacity-40 lg:cursor-pointer font-medium text-[#485158]"
          >
            بعدی
          </button>

          <div className="flex items-center gap-4">
            {getPages().map((item, index) => {
              if (item === "...") {
                return (
                  <span key={`dots-${index}`} className="text-[#485158]">
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSetPage(item as number)}
                  className={`min-w-4 transition lg:cursor-pointer ${
                    page === item
                      ? "text-black font-bold"
                      : "text-[#485158] hover:text-black"
                  }`}
                >
                  {(item as number) + 1}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled={page === 0}
            onClick={() => onSetPage(page - 1)}
            className="disabled:opacity-40 lg:cursor-pointer font-medium text-[#485158]"
          >
            قبلی
          </button>
        </div>
      )}
    </div>
  );
}
