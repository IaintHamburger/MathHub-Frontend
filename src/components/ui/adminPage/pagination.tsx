import { useTranslation } from "react-i18next";
import { Button } from "../button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = false,
  pageSizeOptions = [10, 20, 50, 100],
  className = "",
}: PaginationProps) {
  const { t } = useTranslation();
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div className="text-sm text-slate-400">
        {t("pagination.show")} {startItem}-{endItem} / {t("pagination.total")} {totalItems}
        {t("pagination.page")}
      </div>

      <div className="flex items-center space-x-2">
        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center space-x-2 mr-4">
            <span className="text-sm text-slate-400">{t("pagination.pageSize")}</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded px-2 py-1"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className="border-blue-400/30 text-blue-400 bg-transparent disabled:opacity-50"
        >
          {t("pagination.previous")}
        </Button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={
                  currentPage === pageNum
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-blue-400/30 text-blue-400 bg-transparent"
                }
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="border-blue-400/30 text-blue-400 bg-transparent disabled:opacity-50"
        >
          {t("pagination.next")}
        </Button>
      </div>
    </div>
  );
}
