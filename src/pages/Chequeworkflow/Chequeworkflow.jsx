import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getChequeWorkflowActivities } from "../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Chequeworkflow.css";
import Workflowactivity from "../../components/Chequeworkflow/Workflowactivity";
import Rescheduledetails from "../../components/Chequeworkflow/Rescheduledetails/Rescheduledetails";
import Submissiondetails from "../../components/Chequeworkflow/Submissiondetails/Submissiondetails";


function Chequeworkflow() {
  const { chequeId } = useParams();

  const dispatch = useDispatch();

  const {
    individualCheque,
  workflowActivities,
  activitiesLoading,
  activitiesError,
  } = useSelector((state) => state.chequeTracking);

  useEffect(() => {
    if (chequeId) {
      dispatch(getChequeWorkflowActivities(chequeId));
    }
  }, [dispatch, chequeId]);

  console.log("Cheque details:", individualCheque);
  console.log("Workflow activities:", workflowActivities);

  if (activitiesLoading) {
  return (
    <div className="cheque-workflow-loading">
      Loading cheque workflow...
    </div>
  );
}

if (activitiesError) {
  return (
    <div className="cheque-workflow-error">
      {activitiesError}
    </div>
  );
}

if (!individualCheque) {
  return null;
}

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

return (
  <div className="cheque-workflow-page">

    <div className="workflow-page-heading">
      <h1>Cheque Workflow Management</h1>

      <p>
        View cheque details and manage its complete workflow.
      </p>
    </div>

    <div className="cheque-summary-card">

      <div className="cheque-summary-top">
        <div>
          <span className="summary-label">
            Cheque Number
          </span>

          <h2>{individualCheque.chequeNo}</h2>
        </div>

        <span
          className={`workflow-status-badge ${individualCheque.status}`}
        >
          {individualCheque.status}
        </span>
      </div>

      <div className="cheque-summary-grid">

        <div className="summary-item">
          <span>Amount</span>
          <strong>
            {individualCheque.amountDetails?.currency}{" "}
            {individualCheque.amountDetails?.chequeAmount}
          </strong>
        </div>

        <div className="summary-item">
          <span>Account Holder</span>
          <strong>
            {individualCheque.accountHolderName || "—"}
          </strong>
        </div>

        <div className="summary-item">
          <span>Customer Company</span>
          <strong>
            {individualCheque.customerCompanyName || "—"}
          </strong>
        </div>

        <div className="summary-item">
          <span>Invoice Number</span>
          <strong>
            {individualCheque.invoiceNo || "—"}
          </strong>
        </div>

        <div className="summary-item">
          <span>Cheque Date</span>
          <strong>
            {formatDate(individualCheque.chequeDate)}
          </strong>
        </div>

        <div className="summary-item">
          <span>Received Date</span>
          <strong>
            {formatDate(
              individualCheque.chequeReceivedDate,
            )}
          </strong>
        </div>

        <div className="summary-item">
          <span>Bank</span>
          <strong>
            {individualCheque.customerBankName || "—"}
          </strong>
        </div>

        <div className="summary-item">
          <span>Current Rescheduled Date</span>
          <strong>
            {formatDate(
              individualCheque.currentRescheduledDate,
            )}
          </strong>
        </div>

      </div>

      {individualCheque.attachmentUrl && (
        <div className="cheque-summary-footer">
          <a
            href={individualCheque.attachmentUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Cheque Image
          </a>
        </div>
      )}

    </div>

<div className="workflow-management-layout">

  <div className="workflow-side-column">

   <Rescheduledetails
  cheque={individualCheque}
  workflowActivities={workflowActivities}
/>
 <Submissiondetails cheque={individualCheque} />

  </div>


  <div className="workflow-activity-card">
    <div className="workflow-activity-header">
      <div>
        <h2>Workflow Activities</h2>
        <p>
          Complete history of this cheque
        </p>
      </div>

      <span className="activity-count">
        {workflowActivities.length}
      </span>
    </div>
    <Workflowactivity
  activities={workflowActivities}
/>
  </div>


  <div className="workflow-side-column">

    <div className="workflow-section-card">
      <h3>Bounce / Return details</h3>
    </div>

    <div className="workflow-section-card">
      <h3>Clearance details</h3>
    </div>

  </div>

</div>

  </div>
);
}

export default Chequeworkflow;