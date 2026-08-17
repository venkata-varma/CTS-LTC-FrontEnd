import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

function Filtersection({
  title,
  children,
  onClear,
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="filter-section">
      <div className="filter-section-header">
        <div
          className="filter-section-title"
          onClick={() => setExpanded(!expanded)}
        >
          <h4>{title}</h4>

          {expanded ? <FiChevronDown /> : <FiChevronRight />}
        </div>

        <button
          type="button"
          className="clear-category-btn"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      {expanded && (
        <div className="filter-section-body">
          {children}
        </div>
      )}
    </div>
  );
}

export default Filtersection;