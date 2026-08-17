import "./Chequetable.css";
import Tablerow from "./Tablerow";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { FiArrowUp, FiArrowDown, FiChevronsUp } from "react-icons/fi";

function Chequetable({
  cheques,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
}) {
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <FiChevronsUp className="sort-icon inactive" />;
    }

    return sortDirection === "asc" ? (
      <FiArrowUp className="sort-icon active" />
    ) : (
      <FiArrowDown className="sort-icon active" />
    );
  };
  return (
    <div className="table-wrapper">
      <table className="cheque-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("chequeNo")}>
              <div className="table-heading">
                Cheque No
                {renderSortIcon("chequeNo")}
              </div>
            </th>

            <th onClick={() => handleSort("accountHolderName")}>
              <div className="table-heading">
                Account Holder
                {renderSortIcon("accountHolderName")}
              </div>
            </th>

            <th onClick={() => handleSort("amount")}>
              <div className="table-heading">
                Amount
                {renderSortIcon("amount")}
              </div>
            </th>

            <th>
              <div className="table-heading">Status</div>
            </th>

            <th>
              <div className="table-heading">Attachment</div>
            </th>

            <th onClick={() => handleSort("customerAccountNumber")}>
              <div className="table-heading">
                Bank Account No
                {renderSortIcon("customerAccountNumber")}
              </div>
            </th>

            <th onClick={() => handleSort("chequeReceivedDate")}>
              <div className="table-heading">
                Received on
                {renderSortIcon("chequeReceivedDate")}
              </div>
            </th>

            <th onClick={() => handleSort("chequeSubmittedDate")}>
              <div className="table-heading">
                Submitted on
                {renderSortIcon("chequeSubmittedDate")}
              </div>
            </th>

            <th onClick={() => handleSort("chequeClearanceDate")}>
              <div className="table-heading">
                Cleared on
                {renderSortIcon("chequeClearanceDate")}
              </div>
            </th>

            <th onClick={() => handleSort("invoiceNumber")}>
              <div className="table-heading">
                Invoice
                {renderSortIcon("invoiceNumber")}
              </div>
            </th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cheques.length > 0 ? (
            cheques.map((cheque) => (
              <Tablerow key={cheque._id} cheque={cheque} />
            ))
          ) : (
            <tr>
              <td colSpan="11" className="no-records-cell">
                No cheque records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Chequetable;
