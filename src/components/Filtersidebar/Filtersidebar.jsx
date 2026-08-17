import "./Filtersidebar.css";

import { FiFilter } from "react-icons/fi";

import Filtersection from "./Filtersection";

function Filtersidebar({ filters, setFilters }) {
  const handleStatusChange = (status) => {
    if (filters.status.includes(status)) {
      setFilters({
        ...filters,
        status: filters.status.filter((item) => item !== status),
      });
    } else {
      setFilters({
        ...filters,
        status: [...filters.status, status],
      });
    }
  };
  let appliedFiltersCount =
    filters.status.length +
    (filters.amountRange ? 1 : 0) +
    (filters.attachment ? 1 : 0) +
    (filters.dateRange ? 1 : 0);
  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar-title">
        <div className="filter-title-left">
          <FiFilter />
          <h3>Filter By</h3>
        </div>

        <span className="filter-count">{appliedFiltersCount}</span>
      </div>

      <Filtersection
        title="Status"
        onClear={() =>
          setFilters({
            ...filters,
            status: [],
          })
        }
      >
        <label className="filter-option">
          <input
            type="checkbox"
            checked={filters.status.includes("received")}
            onChange={() => handleStatusChange("received")}
          />
          Received
        </label>

        <label className="filter-option">
          <input
            type="checkbox"
            checked={filters.status.includes("pending-submission")}
            onChange={() => handleStatusChange("pending-submission")}
          />
          Pending submission
        </label>

        <label className="filter-option">
          <input
            type="checkbox"
            checked={filters.status.includes("submitted")}
            onChange={() => handleStatusChange("submitted")}
          />
          Submitted
        </label>

        <label className="filter-option">
          <input
            type="checkbox"
            checked={filters.status.includes("cleared")}
            onChange={() => handleStatusChange("cleared")}
          />
          Cleared
        </label>

        <label className="filter-option">
          <input
            type="checkbox"
            checked={filters.status.includes("returned")}
            onChange={() => handleStatusChange("returned")}
          />
          Returned
        </label>

        <label className="filter-option">
          <input
            type="checkbox"
            checked={filters.status.includes("bounced")}
            onChange={() => handleStatusChange("bounced")}
          />
          Bounced
        </label>
      </Filtersection>

      <Filtersection
        title="Amount Range"
        onClear={() =>
          setFilters({
            ...filters,
            amountRange: "",
          })
        }
      >
        <label className="filter-option">
          <input
            type="radio"
            name="amount"
            checked={filters.amountRange === "0-10000"}
            onChange={() =>
              setFilters({
                ...filters,
                amountRange: "0-10000",
              })
            }
          />
          ₹0 - ₹10,000
        </label>

        <label className="filter-option">
          <input
            type="radio"
            name="amount"
            checked={filters.amountRange === "10001-50000"}
            onChange={() =>
              setFilters({
                ...filters,
                amountRange: "10001-50000",
              })
            }
          />
          ₹10,001 - ₹50,000
        </label>

        <label className="filter-option">
          <input
            type="radio"
            name="amount"
            checked={filters.amountRange === "50000+"}
            onChange={() =>
              setFilters({
                ...filters,
                amountRange: "50000+",
              })
            }
          />
          Above ₹50,000
        </label>
      </Filtersection>

      <Filtersection
        title="Attachment"
        onClear={() =>
          setFilters({
            ...filters,
            attachment: "",
          })
        }
      >
        <label className="filter-option">
          <input
            type="radio"
            name="attachment"
            checked={filters.attachment === "available"}
            onChange={() =>
              setFilters({
                ...filters,
                attachment: "available",
              })
            }
          />
          Available
        </label>

        <label className="filter-option">
          <input
            type="radio"
            name="attachment"
            checked={filters.attachment === "unavailable"}
            onChange={() =>
              setFilters({
                ...filters,
                attachment: "unavailable",
              })
            }
          />
          Not Available
        </label>
      </Filtersection>

      <Filtersection
        title="Date Range"
        onClear={() =>
          setFilters({
            ...filters,
            dateRange: "",
          })
        }
      >
        <label className="filter-option">
          <input
            type="radio"
            name="date"
            checked={filters.dateRange === "today"}
            onChange={() =>
              setFilters({
                ...filters,
                dateRange: "today",
              })
            }
          />
          Today
        </label>

        <label className="filter-option">
          <input
            type="radio"
            name="date"
            checked={filters.dateRange === "week"}
            onChange={() =>
              setFilters({
                ...filters,
                dateRange: "week",
              })
            }
          />
          This Week
        </label>

        <label className="filter-option">
          <input
            type="radio"
            name="date"
            checked={filters.dateRange === "month"}
            onChange={() =>
              setFilters({
                ...filters,
                dateRange: "month",
              })
            }
          />
          This Month
        </label>
      </Filtersection>

      <button
        className="clear-filter-btn"
        onClick={() =>
          setFilters({
            status: [],
            amountRange: "",
            attachment: "",
            dateRange: "",
          })
        }
      >
        Clear Filters
      </button>
    </aside>
  );
}

export default Filtersidebar;
