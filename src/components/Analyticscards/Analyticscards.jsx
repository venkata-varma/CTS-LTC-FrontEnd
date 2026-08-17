import { useMemo } from "react";

import "./Analyticscards.css";
import Analyticscard from "./Analyticscard";
import { FiInfo } from "react-icons/fi";

function Analyticscards({ cheques }) {
  const analytics = useMemo(() => {
    const totalCheques = cheques.length;

    const submittedCheques = cheques.filter(
      (cheque) => cheque.status === "submitted",
    ).length;

    const clearedCheques = cheques.filter(
      (cheque) => cheque.status === "cleared",
    ).length;

    const bouncedCheques = cheques.filter(
      (cheque) =>
        cheque.status === "bounced" || cheque.status === "returned",
    ).length;

    const pendingSubmission = cheques.filter(
      (cheque) => cheque.status === "pending-submission",
    ).length;

    const invoiceCounts = {};

    cheques.forEach((cheque) => {
      const invoiceNo = cheque.invoiceNo;

      if (!invoiceNo) {
        return;
      }

      invoiceCounts[invoiceNo] =
        (invoiceCounts[invoiceNo] || 0) + 1;
    });

    const invoicesWithMultipleCheques = Object.values(
      invoiceCounts,
    ).filter((count) => count > 1).length;

    return {
      totalCheques,
      submittedCheques,
      clearedCheques,
      bouncedCheques,
      pendingSubmission,
      invoicesWithMultipleCheques,
    };
  }, [cheques]);

  return (
    <section className="analytics-wrapper">
      <div className="analytics-header">
        <h2>Cheque Overview</h2>

        <span className="analytics-badge">
          <FiInfo />
          Independent of search & filters
        </span>
      </div>

      <div className="analytics-container">
        <Analyticscard
          title="Total Cheques"
          value={analytics.totalCheques}
          type="total"
        />

        <Analyticscard
          title="Submitted"
          value={analytics.submittedCheques}
          type="submitted"
        />

        <Analyticscard
          title="Pending Submission"
          value={analytics.pendingSubmission}
          type="pending"
        />

        <Analyticscard
          title="Cleared"
          value={analytics.clearedCheques}
          type="cleared"
        />

        <Analyticscard
          title="Returned / Bounced"
          value={analytics.bouncedCheques}
          type="bounced"
        />

        <Analyticscard
          title="Invoices with Multiple Cheques"
          value={analytics.invoicesWithMultipleCheques}
          type="multiple"
        />
      </div>
    </section>
  );
}

export default Analyticscards;