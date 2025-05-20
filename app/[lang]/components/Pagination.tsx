import React from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, setCurrentPage }) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < lastPage - 2) {
        pages.push("...");
      }

      pages.push(lastPage);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-10 pb-32 lg:pb-10">
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        className={`w-10 h-10 flex items-center justify-center bg-white text-black rounded-md ${currentPage === 1 ? "text-gray cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        disabled={currentPage === 1}
      >
        ❮
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index + 100} className="w-10 h-10 flex items-center justify-center text-gray">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page as number)}
            className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === page
              ? "bg-white border border-[#004B7A] text-[#004B7A] font-bold"
              : " text-gray hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => currentPage < lastPage && setCurrentPage(currentPage + 1)}
        className={`w-10 h-10 flex items-center justify-center bg-white text-black rounded-md ${currentPage === lastPage ? "text-gray cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        disabled={currentPage === lastPage}
      >
        ❯
      </button>
    </div>
  );
};

export default Pagination;
