import { useState } from "react";

import "./Clearancedetails.css";

function Clearancedetails({ cheque }) {
  const [showClearanceDetails, setShowClearanceDetails] =
    useState(false);

  const isCleared =
    cheque?.status === "cleared" &&
    cheque?.chequeClearanceDate;

  const clearanceDetails =
    cheque?.clearanceDetails || {};

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
    <>
      <div className="clearance-details-card">
        <h3>Clearance details</h3>

        {!isCleared ? (
          <>
            <div className="clearance-empty-state">
              <div className="clearance-empty-icon">
                ✓
              </div>

              <div>
                <span>Clearance Status</span>
                <strong>Not yet cleared</strong>
              </div>
            </div>

            <button
              type="button"
              className="record-clearance-button"
            >
              Record Clearance
            </button>
          </>
        ) : (
          <>
            {/* CLEARED SUMMARY */}

            <div className="clearance-success-box">
              <span className="clearance-success-icon">
                ✓
              </span>

              <div className="clearance-success-content">
                <span className="clearance-success-label">
                  Cheque Cleared
                </span>

                <strong className="clearance-success-amount">
                  {cheque.amountDetails?.currency || "INR"}{" "}
                  {clearanceDetails.clearedAmount || "—"}
                </strong>
              </div>

              <strong className="clearance-success-date">
                {formatDateTime(
                  cheque.chequeClearanceDate
                )}
              </strong>
            </div>

            {/* VIEW DETAILS */}

            <button
              type="button"
              className="view-clearance-details-button"
              onClick={() =>
                setShowClearanceDetails(true)
              }
            >
              View Clearance Details
            </button>
          </>
        )}
      </div>

      {/* CLEARANCE DETAILS POPUP */}

      {showClearanceDetails && (
        <div
          className="clearance-details-preview-overlay"
          onClick={() =>
            setShowClearanceDetails(false)
          }
        >
          <div
            className="clearance-details-preview"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="clearance-details-preview-header">
              <h3>Clearance Details</h3>

              <button
                type="button"
                onClick={() =>
                  setShowClearanceDetails(false)
                }
              >
                ×
              </button>
            </div>

            <div className="clearance-preview-grid">
              <div>
                <span>Cleared Amount</span>

                <strong>
                  {cheque.amountDetails?.currency || "INR"}{" "}
                  {clearanceDetails.clearedAmount || "—"}
                </strong>
              </div>

              <div>
                <span>Bank Name</span>

                <strong>
                  {clearanceDetails.bankName || "—"}
                </strong>
              </div>

              <div>
                <span>Bank Branch</span>

                <strong>
                  {clearanceDetails.bankBranch || "—"}
                </strong>
              </div>

              <div>
                <span>Account Number</span>

                <strong>
                  {clearanceDetails.accountNumber || "—"}
                </strong>
              </div>
            </div>

            {clearanceDetails.clearanceNotes && (
              <div className="clearance-preview-notes">
                <span>Clearance Notes</span>

                <p>
                  {clearanceDetails.clearanceNotes}
                </p>
              </div>
            )}

            <div className="clearance-preview-footer">
              <button
                type="button"
                onClick={() =>
                  setShowClearanceDetails(false)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Clearancedetails;