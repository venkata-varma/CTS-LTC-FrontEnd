import { useMemo, useState } from "react";
import {
  FiX,
  FiMessageSquare,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

import "./Noteshistorymodal.css";

const Noteshistorymodal = ({ cheque, notes, onClose }) => {
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      const firstDate = new Date(a.createdAt);
      const secondDate = new Date(b.createdAt);

      if (sortOrder === "desc") {
        return secondDate - firstDate;
      }

      return firstDate - secondDate;
    });
  }, [notes, sortOrder]);

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="notes-history-overlay">
      <div className="notes-history-modal">

        {/* Header */}
        <div className="notes-history-header">
          <div>
            <h2>Notes History</h2>
            <p>All notes recorded for this cheque.</p>
          </div>

          <button
            type="button"
            className="notes-history-close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        {/* Cheque information */}
        <div className="notes-history-cheque-info">
          <div>
            <span>Cheque No</span>
            <strong>{cheque?.chequeNo || "—"}</strong>
          </div>

          <div>
            <span>Account Holder</span>
            <strong>{cheque?.accountHolderName || "—"}</strong>
          </div>

          <div>
            <span>Total Notes</span>
            <strong>{notes.length}</strong>
          </div>
        </div>

        {/* Toolbar */}
        <div className="notes-history-toolbar">
          <span>
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </span>

          <button
            type="button"
            className="notes-sort-button"
            onClick={() =>
              setSortOrder((current) =>
                current === "desc" ? "asc" : "desc"
              )
            }
          >
            {sortOrder === "desc" ? (
              <>
                <FiArrowUp />
                Show Ascending
              </>
            ) : (
              <>
                <FiArrowDown />
                Show Descending
              </>
            )}
          </button>
        </div>

        {/* Notes */}
        <div className="notes-history-list">
          {sortedNotes.map((activity) => (
            <div
              className="notes-history-item"
              key={activity._id}
            >
              <div className="notes-history-item-icon">
                <FiMessageSquare />
              </div>

              <div className="notes-history-item-content">
                <p className="notes-history-text">
                  {activity.details?.note ||
                    activity.description ||
                    "—"}
                </p>

                <div className="notes-history-meta">
                  <span>
                    Added by{" "}
                    <strong>
                      {activity.performedBy?.userName || "—"}
                    </strong>
                  </span>

                  <span>
                    {formatDateTime(activity.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="notes-history-footer">
          <button
            type="button"
            className="notes-history-close-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default Noteshistorymodal;