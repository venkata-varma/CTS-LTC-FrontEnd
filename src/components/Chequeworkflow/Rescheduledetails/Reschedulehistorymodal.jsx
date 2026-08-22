import { FiX, FiCalendar, FiUser } from "react-icons/fi";
import "./Reschedulehistorymodal.css";

function Reschedulehistorymodal({
  activities = [],
  currentRescheduledDate,
  onClose,
}) {
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const isCurrentDate = (date) => {
    if (!date || !currentRescheduledDate) return false;

    return (
      new Date(date).getTime() ===
      new Date(currentRescheduledDate).getTime()
    );
  };

  return (
    <div className="reschedule-history-overlay" onClick={onClose}>
      <div
        className="reschedule-history-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="reschedule-history-modal-header">
          <div>
            <h2>Reschedule History</h2>
            <p>Complete rescheduling history of this cheque</p>
          </div>

          <button
            type="button"
            className="reschedule-history-close-btn"
            onClick={onClose}
            aria-label="Close reschedule history"
          >
            <FiX />
          </button>
        </div>

        <div className="reschedule-history-modal-body">
          {sortedActivities.map((activity) => {
            const newDate =
              activity?.details?.newRescheduledDate;

            const current = isCurrentDate(newDate);

            return (
              <div
                className="reschedule-history-item"
                key={activity._id}
              >
                <div className="reschedule-history-item-top">
                  <div className="reschedule-history-date">
                    <FiCalendar />

                    <strong>{formatDate(newDate)}</strong>
                  </div>

                  {current && (
                    <span className="current-reschedule-badge">
                      Current
                    </span>
                  )}
                </div>

                <div className="reschedule-history-reason">
                  <span>Reason</span>

                  <p>
                    {activity?.details?.rescheduleReason ||
                      "No reason provided."}
                  </p>
                </div>

                <div className="reschedule-history-meta">
                  <div>
                    <FiUser />

                    <span>
                      Rescheduled by{" "}
                      <strong>
                        {activity?.performedBy?.userName ||
                          "Unknown"}
                      </strong>
                    </span>
                  </div>

                  <span>
                    {formatDateTime(activity.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Reschedulehistorymodal;