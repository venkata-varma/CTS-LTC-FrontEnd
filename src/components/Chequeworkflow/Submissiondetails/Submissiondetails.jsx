import "./Submissiondetails.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FiMapPin } from "react-icons/fi";

import Submissionmodal from "./Submissionmodal";

function Submissiondetails({ cheque }) {
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] =
    useState(false);

  const workflowActivities = useSelector(
    (state) =>
      state.chequeTracking.workflowActivities,
  );

  const isAlreadySubmitted = Boolean(
    cheque?.chequeSubmittedDate,
  );

  // First submission happens only once.
  // Find its workflow activity to get
  // company bank / branch information.
  const submissionActivity =
    workflowActivities.find(
      (activity) =>
        activity.activityType === "cheque-submitted",
    );

  const bankName =
    submissionActivity?.details?.bankName || "—";

  const bankBranch =
    submissionActivity?.details?.bankBranch || "—";

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="workflow-section-card submission-details-card">
      <h3>Submission details</h3>

      <div className="submission-highlight-box">
        <div className="submission-highlight-icon">
          🏦
        </div>

        <div>
          <span>First Submission</span>

          <strong>
            {formatDateTime(
              cheque?.chequeSubmittedDate,
            )}
          </strong>
        </div>
      </div>

      {isAlreadySubmitted && (
        <div className="submission-bank-details">
          <div className="submission-bank-icon">
            <FiMapPin />
          </div>

          <div className="submission-bank-info">
            <div>
              <span>Deposited To</span>
              <strong>{bankName}</strong>
            </div>

            <div>
              <span>Branch</span>
              <strong>{bankBranch}</strong>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className="record-submission-button"
        disabled={isAlreadySubmitted}
        onClick={() =>
          setIsSubmissionModalOpen(true)
        }
      >
        {isAlreadySubmitted
          ? "Submission Recorded"
          : "Record Submission"}
      </button>

      {isSubmissionModalOpen && (
        <Submissionmodal
          cheque={cheque}
          onClose={() =>
            setIsSubmissionModalOpen(false)
          }
        />
      )}
    </div>
  );
}

export default Submissiondetails;