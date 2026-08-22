import { useState } from "react";
import { FiEye, FiCalendar } from "react-icons/fi";

import Reschedulehistorymodal from "./Reschedulehistorymodal";
import "./Rescheduledetails.css";
import Reschedulemodal from "./Reschedulemodal";

function Rescheduledetails({ cheque, workflowActivities = [] }) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const rescheduleActivities = workflowActivities.filter(
    (activity) => activity.activityType === "cheque-rescheduled",
  );

  const hasBeenRescheduled = rescheduleActivities.length > 0;

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="reschedule-details-card">
        <div className="reschedule-details-header">
          <h3>Reschedule details</h3>
        </div>

        <div className="reschedule-current-date">
          <div className="reschedule-current-date-icon">
            <FiCalendar />
          </div>

          <div className="reschedule-current-date-content">
            <span>Current Rescheduled Date</span>

            <strong>{formatDate(cheque?.currentRescheduledDate)}</strong>
          </div>
        </div>
        <div className="reschedule-history-row">
          <div>
            <span className="reschedule-history-label">Reschedule History</span>

            <strong>
              {rescheduleActivities.length === 0
                ? "No reschedules"
                : `${rescheduleActivities.length} ${
                    rescheduleActivities.length === 1
                      ? "reschedule"
                      : "reschedules"
                  }`}
            </strong>
          </div>

          <button
            type="button"
            className="view-reschedule-history-btn"
            onClick={() => setIsHistoryOpen(true)}
            disabled={rescheduleActivities.length === 0}
          >
            <FiEye />
            View
          </button>
        </div>

        <div className="reschedule-details-footer">
          <button
            type="button"
            className="reschedule-action-btn"
            onClick={() => setIsRescheduleOpen(true)}
          >
            {hasBeenRescheduled ? "Reschedule Again" : "Reschedule"}
          </button>
        </div>
      </div>

      {isHistoryOpen && (
        <Reschedulehistorymodal
          activities={rescheduleActivities}
          currentRescheduledDate={cheque?.currentRescheduledDate}
          onClose={() => setIsHistoryOpen(false)}
        />
      )}
      {isRescheduleOpen && (
        <Reschedulemodal
          cheque={cheque}
          onClose={() => setIsRescheduleOpen(false)}
        />
      )}
    </>
  );
}

export default Rescheduledetails;
