import "./Workflowactivity.css";
import { useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

function Workflowactivity({ activities = [] }) {
  const [sortOrder, setSortOrder] = useState("desc");

  const activitiesWithNumber = activities.map((activity, index) => ({
    ...activity,
    activityNumber: index + 1,
  }));

  const displayedActivities =
    sortOrder === "desc"
      ? [...activitiesWithNumber].reverse()
      : [...activitiesWithNumber];

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

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (activities.length === 0) {
    return (
      <div className="workflow-empty">
        No workflow activities available for this cheque.
      </div>
    );
  }

  return (
     <div className="workflow-activity-body">
      <div className="workflow-sort-bar">
        <span className="workflow-order-label">
          {sortOrder === "desc" ? "Descending order" : "Ascending order"}
        </span>

        <button
          type="button"
          className="workflow-sort-button"
          onClick={() =>
            setSortOrder((currentOrder) =>
              currentOrder === "desc" ? "asc" : "desc"
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

      <div className="workflow-timeline">
        {displayedActivities.map((activity) => (
          <div className="workflow-timeline-item" key={activity._id}>
            <div className="timeline-marker">
              <span className="timeline-number">
                {activity.activityNumber}
              </span>

              <span className="timeline-line" />
            </div>

            <div className="timeline-content">
              <div className="timeline-heading">
                <h3>{activity.title}</h3>

                <span className="timeline-date">
                  {formatDateTime(activity.createdAt)}
                </span>
              </div>

              {activity.description && (
                <p className="timeline-description">
                  {activity.description}
                </p>
              )}

              {activity.activityType === "cheque-rescheduled" && (
                <div className="timeline-details">
                  <div>
                    <span>Previous Date</span>
                    <strong>
                      {formatDate(
                        activity.details?.previousRescheduledDate
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>New Date</span>
                    <strong>
                      {formatDate(activity.details?.newRescheduledDate)}
                    </strong>
                  </div>

                  {activity.details?.rescheduleReason && (
                    <div className="timeline-reason">
                      <span>Reason</span>
                      <strong>
                        {activity.details.rescheduleReason}
                      </strong>
                    </div>
                  )}
                </div>
              )}

              {activity.performedBy && (
                <div className="timeline-performed-by">
                  Performed by{" "}
                  <strong>{activity.performedBy.userName}</strong>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workflowactivity;