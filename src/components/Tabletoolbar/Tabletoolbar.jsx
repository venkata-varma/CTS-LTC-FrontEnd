import "./Tabletoolbar.css";
import { FiSearch } from "react-icons/fi";

function Tabletoolbar({
  searchTerm,
  setSearchTerm,
  totalRecords
}) {
  return (
    <>
      <div className="table-toolbar">

        <div className="search-box">
          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search by Cheque No, Customer or Invoice..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="record-count">
          Total Records : <strong>{totalRecords}</strong>
        </div>

      </div>

      <div className="active-filters">
        <span className="filter-badge">
          No filters applied
        </span>
      </div>

    </>
  );
}

export default Tabletoolbar;