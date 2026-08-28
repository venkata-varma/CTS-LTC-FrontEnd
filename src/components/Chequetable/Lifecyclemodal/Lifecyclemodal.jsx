import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiX,
  FiCheckCircle,
  FiClock,
  FiRefreshCcw,
  FiSend,
  FiMapPin,
  FiFileText,
  FiAlertCircle,
  FiCornerDownLeft,
  FiRepeat,
} from "react-icons/fi";

import { getChequeWorkflowActivities } from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Lifecyclemodal.css";

const Lifecyclemodal = ({ cheque, onClose }) => {
  const dispatch = useDispatch();

  const { workflowActivities, activitiesLoading, activitiesError } =
    useSelector((state) => state.chequeTracking);

  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    if (cheque?._id) {
      dispatch(getChequeWorkflowActivities(cheque._id));
    }
  }, [dispatch, cheque?._id]);

  const sortedActivities = useMemo(() => {
    const activities = [...(workflowActivities || [])];

    return activities.sort((a, b) => {
      const firstDate = new Date(a.createdAt).getTime();
      const secondDate = new Date(b.createdAt).getTime();

      return sortOrder === "newest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
  }, [workflowActivities, sortOrder]);

  const activitySequenceMap = useMemo(() => {
    const chronologicalActivities = [...(workflowActivities || [])].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    const sequenceMap = {};

    chronologicalActivities.forEach((activity, index) => {
      sequenceMap[activity._id] = index + 1;
    });

    return sequenceMap;
  }, [workflowActivities]);

  const formatDateTime = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAmount = (amount) => {
    const number = Number(amount);

    if (Number.isNaN(number)) {
      return amount || "—";
    }

    return number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getActivityIcon = (activityType) => {
    switch (activityType) {
      case "cheque-submitted":
        return <FiSend />;

      case "cheque-rescheduled":
        return <FiRefreshCcw />;

      case "present-place-updated":
        return <FiMapPin />;

      case "cheque-bounced":
        return <FiAlertCircle />;

      case "returned-cheque-received":
        return <FiCornerDownLeft />;

      case "cheque-redeposited":
        return <FiRepeat />;

      case "cheque-cleared":
        return <FiCheckCircle />;

      case "note-added":
        return <FiFileText />;

      default:
        return <FiClock />;
    }
  };

  const getActivityClass = (activityType) => {
    switch (activityType) {
      case "cheque-cleared":
        return "success";

      case "cheque-bounced":
        return "danger";

      case "returned-cheque-received":
        return "returned";

      case "cheque-redeposited":
        return "redeposit";

      case "cheque-submitted":
        return "submitted";

      case "cheque-rescheduled":
        return "rescheduled";

      case "note-added":
        return "note";

      default:
        return "default";
    }
  };

  const getPerformedBy = (activity) => {
    if (!activity?.performedBy) {
      return "—";
    }

    if (typeof activity.performedBy === "string") {
      return activity.performedBy;
    }

    return (
      activity.performedBy.userName || activity.performedBy.userEmail || "—"
    );
  };

  const currency = cheque?.amountDetails?.currency?.trim() || "INR";

  return (
    <div className="lifecycle-modal-overlay">
      <div className="lifecycle-modal-container">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="lifecycle-modal-header">
          <div>
            <h2>Cheque Lifecycle</h2>

            <p>
              Complete activity history of this cheque from receipt through its
              current stage.
            </p>
          </div>

          <button
            type="button"
            className="lifecycle-modal-close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        {/* =====================================
            CHEQUE SUMMARY
        ===================================== */}

        <div className="lifecycle-cheque-summary">
          <div className="lifecycle-summary-item">
            <span>Cheque No</span>
            <strong>{cheque?.chequeNo || "—"}</strong>
          </div>

          <div className="lifecycle-summary-item">
            <span>Account Holder</span>
            <strong>{cheque?.accountHolderName || "—"}</strong>
          </div>

          <div className="lifecycle-summary-item">
            <span>Amount</span>
            <strong>
              {currency} {formatAmount(cheque?.amountDetails?.chequeAmount)}
            </strong>
          </div>

          <div className="lifecycle-summary-item">
            <span>Current Status</span>

            <strong
              className={`lifecycle-current-status ${cheque?.status || ""}`}
            >
              {cheque?.status || "—"}
            </strong>
          </div>
        </div>

        {/* =====================================
            TOOLBAR
        ===================================== */}

        <div className="lifecycle-toolbar">
          <div>
            <h3>Activity History</h3>

            {!activitiesLoading && !activitiesError && (
              <span>
                {sortedActivities.length}{" "}
                {sortedActivities.length === 1 ? "activity" : "activities"}
              </span>
            )}
          </div>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="lifecycle-sort-select"
          >
            <option value="newest">Newest first</option>

            <option value="oldest">Oldest first</option>
          </select>
        </div>

        {/* =====================================
            BODY
        ===================================== */}

        <div className="lifecycle-modal-body">
          {activitiesLoading && (
            <div className="lifecycle-state-message">
              <FiClock />

              <div>
                <strong>Loading lifecycle...</strong>
                <p>Fetching cheque workflow activities.</p>
              </div>
            </div>
          )}

          {!activitiesLoading && activitiesError && (
            <div className="lifecycle-state-message lifecycle-error-state">
              <FiAlertCircle />

              <div>
                <strong>Unable to load lifecycle</strong>

                <p>{activitiesError}</p>
              </div>
            </div>
          )}

          {!activitiesLoading &&
            !activitiesError &&
            sortedActivities.length === 0 && (
              <div className="lifecycle-state-message">
                <FiClock />

                <div>
                  <strong>No workflow activities yet</strong>

                  <p>
                    Activities will appear here as this cheque moves through its
                    lifecycle.
                  </p>
                </div>
              </div>
            )}

          {!activitiesLoading &&
            !activitiesError &&
            sortedActivities.length > 0 && (
              <div className="lifecycle-timeline">
                {sortedActivities.map((activity, index) => (
                  <div className="lifecycle-activity" key={activity._id}>
                    <div className="lifecycle-timeline-side">
                      <div className="lifecycle-activity-number">
                        {activitySequenceMap[activity._id]}
                      </div>

                      {index !== sortedActivities.length - 1 && (
                        <div className="lifecycle-line" />
                      )}
                    </div>

                    <div className="lifecycle-activity-card">
                      <div className="lifecycle-activity-top">
                        <div>
                          <h4>{activity.title || "Cheque Activity"}</h4>

                          <span className="lifecycle-activity-type">
                            {activity.activityType || "activity"}
                          </span>
                        </div>

                        <time>{formatDateTime(activity.createdAt)}</time>
                      </div>

                      {activity.description && (
                        <p className="lifecycle-activity-description">
                          {activity.description}
                        </p>
                      )}

                      <div className="lifecycle-activity-footer">
                        <span>Performed by</span>

                        <strong>{getPerformedBy(activity)}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="lifecycle-modal-footer">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lifecyclemodal;
