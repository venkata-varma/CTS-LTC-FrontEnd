import "./Pagination.css";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  recordsPerPage,
  setCurrentPage,
}) {
  if (totalRecords === 0) {
    return null;
  }

  const startRecord =
    (currentPage - 1) * recordsPerPage + 1;

  const endRecord = Math.min(
    currentPage * recordsPerPage,
    totalRecords,
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <span className="pagination-info">
        Showing {startRecord}–{endRecord} of {totalRecords} records
      </span>

      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <FiChevronLeft />
          Previous
        </button>

        <div className="pagination-pages">
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              key={page}
              type="button"
              className={`page-number ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="pagination-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;