import { FiEdit2, FiUpload, FiRefreshCcw } from "react-icons/fi";
import { FiPaperclip } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Tablerow({ cheque }) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/cheque-tracking-system/${cheque._id}`);
  };

  return (
    <tr className="clickable-cheque-row" onClick={handleRowClick}>
      <td>
        <span className="cheque-number">{cheque.chequeNo}</span>
      </td>

      <td>
        <div className="account-holder">{cheque.accountHolderName}</div>
      </td>

      <td className="amount-cell">
        ₹ {Number(cheque.amountDetails.chequeAmount).toLocaleString("en-IN")}
      </td>

      <td>
        <span className={`status-badge ${cheque.status}`}>
          {cheque.status.replace("-", " ")}
        </span>
      </td>

      <td>
        {cheque.attachmentUrl ? (
          <span className="attachment available">
            <FiPaperclip className="attachment-icon" />
            View
          </span>
        ) : (
          <span className="attachment unavailable">No File</span>
        )}
      </td>

      <td>{cheque.customerAccountNumber}</td>

      <td>{new Date(cheque.chequeReceivedDate).toLocaleDateString("en-IN")}</td>

      <td>
        {cheque.chequeSubmittedDate
          ? new Date(cheque.chequeSubmittedDate).toLocaleDateString("en-IN")
          : "-"}
      </td>

      <td>
        {cheque.chequeClearanceDate
          ? new Date(cheque.chequeClearanceDate).toLocaleDateString("en-IN")
          : "-"}
      </td>

      <td>{cheque.invoiceNo || "-"}</td>

      <td  onClick={(e) => e.stopPropagation()}>
        <div className="action-buttons">
          <button className="edit-btn">
            <FiEdit2 />
            Edit
          </button>

          <button className="upload-btn">
            <FiUpload />
            Upload
          </button>

          <button className="reschedule-btn">
            <FiRefreshCcw />
            Reschedule
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Tablerow;
