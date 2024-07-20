import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getCompactPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (currentPage > 3) {
      pages.push("...");
    }
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-center">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded mx-1 md:mx-2 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="hidden md:flex">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(page)}
              disabled={currentPage === page}
              className={`px-2 md:px-4 py-1 md:py-2 mx-1 md:mx-2 rounded ${
                currentPage === page
                  ? "bg-gray-500 text-white"
                  : "bg-white text-blue-500 hover:bg-[#485986] hover:text-white transition-colors duration-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="flex md:hidden">
          {getCompactPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageClick(page)}
              disabled={currentPage === page || typeof page === "string"}
              className={`px-2 py-1 mx-1 rounded ${
                currentPage === page
                  ? "bg-gray-500 text-white"
                  : "bg-white text-blue-500 hover:bg-[#485986] hover:text-white transition-colors duration-200"
              } ${typeof page === "string" && "cursor-default"}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded mx-1 md:mx-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="flex md:hidden mt-2">
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
