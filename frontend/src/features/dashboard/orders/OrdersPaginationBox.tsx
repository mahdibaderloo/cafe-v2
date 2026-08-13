import type { DiscountPaginationProps } from "../../../types/dashboard.type";

export default function OrdersPaginationBox({
  page,
  totalPages = 10,
  onSetPage,
}: DiscountPaginationProps) {
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

  if (totalPages > 1)
    return (
      <div className="flex items-center justify-end gap-5 w-full bg-[#748F80] px-5 py-3">
        <button
          type="button"
          disabled={page === totalPages - 1}
          onClick={() => onSetPage(page + 1)}
          className="disabled:opacity-40 lg:cursor-pointer font-medium text-white"
        >
          بعدی
        </button>

        <div className="flex items-center gap-4">
          {getPages().map((item, index) => {
            if (item === "...") {
              return (
                <span key={`dots-${index}`} className="text-white">
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
                    ? "text-white font-bold"
                    : "text-[#ffffff8e] hover:text-white"
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
          className="disabled:opacity-40 lg:cursor-pointer font-medium text-white"
        >
          قبلی
        </button>
      </div>
    );
}
