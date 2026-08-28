import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FiX,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";

import { getChequeBounceCycles } from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Bounceredepositsummarymodal.css";

function Bounceredepositsummarymodal({
  cheque,
  workflowActivities,
  onClose,
}) {
  const dispatch = useDispatch();

  const {
    bounceCycles,
    bounceCyclesLoading,
    bounceCyclesError,
  } = useSelector(
    (state) => state.chequeTracking
  );

  // ========================================
  // FETCH BOUNCE CYCLES
  // ========================================

  useEffect(() => {
    if (cheque?._id) {
      dispatch(
        getChequeBounceCycles(cheque._id)
      );
    }
  }, [dispatch, cheque?._id]);

  // ========================================
  // FIRST SUBMISSION ACTIVITY
  // ========================================

  const firstSubmissionActivity =
    useMemo(() => {
      return workflowActivities.find(
        (activity) =>
          activity.activityType ===
          "cheque-submitted"
      );
    }, [workflowActivities]);

  // ========================================
  // SORT BOUNCE CYCLES
  // ========================================

  const sortedBounceCycles =
    useMemo(() => {
      return [...(bounceCycles || [])].sort(
        (a, b) =>
          a.bounceNumber -
          b.bounceNumber
      );
    }, [bounceCycles]);

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );
  };

  // ========================================
  // BUILD DEPOSIT ATTEMPTS
  // ========================================

  const attempts = useMemo(() => {
    const submissionDetails =
      firstSubmissionActivity?.details || {};

    const attemptOne = {
      attemptNumber: 1,

      type: "First Submission",

      depositDate:
        submissionDetails.submissionDate ||
        cheque?.chequeSubmittedDate ||
        null,

      depositedBy:
        submissionDetails.depositedBy ||
        "—",

      bankName:
        submissionDetails.bankName ||
        "—",

      bankBranch:
        submissionDetails.bankBranch ||
        "—",

      bounceCycle:
        sortedBounceCycles.find(
          (cycle) =>
            cycle.bounceNumber === 1
        ) || null,
    };

    const bounceOne =
      sortedBounceCycles.find(
        (cycle) =>
          cycle.bounceNumber === 1
      );

    const attemptTwo = {
      attemptNumber: 2,

      type: "Redeposit #1",

      depositDate:
        bounceOne?.redepositDate || null,

      depositedBy:
        bounceOne?.redepositedBy || "—",

      bankName:
        bounceOne?.redepositBankName ||
        "—",

      bankBranch:
        bounceOne?.redepositBankBranch ||
        "—",

      bounceCycle:
        sortedBounceCycles.find(
          (cycle) =>
            cycle.bounceNumber === 2
        ) || null,
    };

    const bounceTwo =
      sortedBounceCycles.find(
        (cycle) =>
          cycle.bounceNumber === 2
      );

    const attemptThree = {
      attemptNumber: 3,

      type: "Redeposit #2",

      depositDate:
        bounceTwo?.redepositDate || null,

      depositedBy:
        bounceTwo?.redepositedBy || "—",

      bankName:
        bounceTwo?.redepositBankName ||
        "—",

      bankBranch:
        bounceTwo?.redepositBankBranch ||
        "—",

      bounceCycle:
        sortedBounceCycles.find(
          (cycle) =>
            cycle.bounceNumber === 3
        ) || null,
    };

    return [
      attemptOne,
      attemptTwo,
      attemptThree,
    ];
  }, [
    cheque,
    firstSubmissionActivity,
    sortedBounceCycles,
  ]);

  // ========================================
  // ATTEMPT RESULT
  // ========================================

  const getAttemptResult = (attempt) => {
    if (!attempt.depositDate) {
      return {
        type: "not-reached",
        label: "Not Reached",
      };
    }

    if (attempt.bounceCycle) {
      return {
        type: "bounced",
        label: "Bounced",
      };
    }

    if (
      cheque?.status === "cleared"
    ) {
      return {
        type: "cleared",
        label: "Cleared",
      };
    }

    return {
      type: "pending",
      label: "Awaiting Outcome",
    };
  };

  // ========================================
  // LIFECYCLE COUNTS
  // ========================================

  const lifecycleCounts =
    useMemo(() => {
      const depositCount =
        attempts.filter(
          (attempt) =>
            Boolean(attempt.depositDate)
        ).length;

      const bounceCount =
        sortedBounceCycles.length;

      const returnCount =
        sortedBounceCycles.filter(
          (cycle) =>
            Boolean(
              cycle.returnedChequeReceivedDate
            )
        ).length;

      return {
        depositCount,
        bounceCount,
        returnCount,
      };
    }, [
      attempts,
      sortedBounceCycles,
    ]);

  // ========================================
  // LIFECYCLE SUMMARY
  // ========================================

  const lifecycleSummary =
    useMemo(() => {
      const {
        depositCount,
        bounceCount,
        returnCount,
      } = lifecycleCounts;

      // CLEARED
      if (
        cheque?.status === "cleared"
      ) {
        return {
          type: "success",

          title:
            depositCount === 3
              ? "Cheque Cleared on Final Attempt"
              : "Cheque Cleared",

          description:
            depositCount === 1
              ? "The cheque was cleared successfully on its first deposit."
              : `The cheque was cleared successfully after ${
                  depositCount - 1
                } ${
                  depositCount - 1 === 1
                    ? "redeposit"
                    : "redeposits"
                }. No further action is required.`,
        };
      }

      // MAXIMUM BOUNCES REACHED
      if (bounceCount >= 3) {
        return {
          type: "failed",

          title:
            "Maximum Bounce Limit Reached",

          description:
            "The cheque has bounced on all three permitted deposit attempts. No further redeposit can be recorded.",
        };
      }

      // NO FIRST SUBMISSION YET
      if (depositCount === 0) {
        return {
          type: "pending",

          title:
            "Awaiting First Submission",

          description:
            "The cheque has been received but has not yet entered its first bank deposit attempt.",
        };
      }

      const latestBounce =
        sortedBounceCycles[
          sortedBounceCycles.length - 1
        ];

      // FIRST SUBMISSION / REDEPOSIT
      // WAITING FOR BANK OUTCOME
      if (!latestBounce) {
        return {
          type: "pending",

          title:
            "Awaiting Bank Outcome",

          description:
            "The first deposit has been recorded and the cheque is awaiting the bank's outcome.",
        };
      }

      // BOUNCED BUT HARD COPY NOT BACK
      if (
        !latestBounce.returnedChequeReceivedDate
      ) {
        return {
          type: "pending",

          title:
            "Awaiting Returned Cheque",

          description:
            `Bounce #${latestBounce.bounceNumber} has been recorded. The physical returned cheque is yet to be received.`,
        };
      }

      // RETURNED BUT NOT REDEPOSITED
      if (
        !latestBounce.redepositDate
      ) {
        return {
          type: "pending",

          title:
            "Awaiting Redeposit",

          description:
            `The returned cheque for Bounce #${latestBounce.bounceNumber} has been received and is ready for the next deposit attempt.`,
        };
      }

      // REDEPOSITED, WAITING OUTCOME
      return {
        type: "pending",

        title:
          "Awaiting Bank Outcome",

        description:
          `The cheque has been redeposited after Bounce #${latestBounce.bounceNumber} and is awaiting the bank's outcome.`,
      };
    }, [
      cheque,
      lifecycleCounts,
      sortedBounceCycles,
    ]);

  // ========================================
  // SUMMARY ICON
  // ========================================

  const SummaryIcon = () => {
    if (
      lifecycleSummary.type ===
      "success"
    ) {
      return <FiCheckCircle />;
    }

    if (
      lifecycleSummary.type ===
      "failed"
    ) {
      return <FiXCircle />;
    }

    return <FiClock />;
  };

  return (
    <div
      className="bounce-summary-overlay"
      onClick={onClose}
    >
      <div
        className="bounce-summary-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* ==========================
            HEADER
        ========================== */}

        <div className="bounce-summary-modal-header">
          <div>
            <h2>
              Bounce &amp; Redeposit Summary
            </h2>

            <p>
              Complete deposit, bounce and
              returned-cheque history.
            </p>
          </div>

          <button
            type="button"
            className="bounce-summary-close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>

        {/* ==========================
            CHEQUE SUMMARY
        ========================== */}

        <div className="bounce-summary-cheque-info">
          <div>
            <span>Cheque No</span>

            <strong>
              {cheque?.chequeNo || "—"}
            </strong>
          </div>

          <div>
            <span>Account Holder</span>

            <strong>
              {cheque?.accountHolderName ||
                "—"}
            </strong>
          </div>

          <div>
            <span>Cheque Amount</span>

            <strong>
              {cheque?.amountDetails
                ?.currency || "INR"}{" "}
              {cheque?.amountDetails
                ?.chequeAmount || "—"}
            </strong>
          </div>

          <div>
            <span>Current Status</span>

            <strong className="bounce-summary-current-status">
              {cheque?.status || "—"}
            </strong>
          </div>
        </div>

        {/* ==========================
            BODY
        ========================== */}

        <div className="bounce-summary-body">
          {bounceCyclesLoading && (
            <div className="bounce-summary-message">
              Loading cheque lifecycle...
            </div>
          )}

          {!bounceCyclesLoading &&
            bounceCyclesError && (
              <div className="bounce-summary-error">
                {bounceCyclesError}
              </div>
            )}

          {!bounceCyclesLoading &&
            !bounceCyclesError && (
              <>
                 {/* ==========================
                    LIFECYCLE SUMMARY
                ========================== */}

                <div
                  className={`bounce-lifecycle-summary ${lifecycleSummary.type}`}
                >
                  <div className="bounce-lifecycle-icon">
                    <SummaryIcon />
                  </div>

                  <div className="bounce-lifecycle-content">
                    <h3>
                      {
                        lifecycleSummary.title
                      }
                    </h3>

                    <div className="bounce-lifecycle-counts">
                      <span>
                        <strong>
                          {
                            lifecycleCounts.depositCount
                          }
                        </strong>{" "}
                        {lifecycleCounts.depositCount ===
                        1
                          ? "Deposit"
                          : "Deposits"}
                      </span>

                      <span>
                        <strong>
                          {
                            lifecycleCounts.bounceCount
                          }
                        </strong>{" "}
                        {lifecycleCounts.bounceCount ===
                        1
                          ? "Bounce"
                          : "Bounces"}
                      </span>

                      <span>
                        <strong>
                          {
                            lifecycleCounts.returnCount
                          }
                        </strong>{" "}
                        {lifecycleCounts.returnCount ===
                        1
                          ? "Return to Office"
                          : "Returns to Office"}
                      </span>
                    </div>

                    <p>
                      {
                        lifecycleSummary.description
                      }
                    </p>
                  </div>
                </div>
                {/* ==========================
                    TABLE
                ========================== */}

                <div className="bounce-summary-table-wrapper">
                  <table className="bounce-summary-table">
                    <thead>
                      <tr>
                        <th>Attempt</th>

                        <th>
                          Deposit / Redeposit
                        </th>

                        <th>
                          Deposited By
                        </th>

                        <th>
                          Bank / Branch
                        </th>

                        <th>
                          Bounce
                        </th>

                        <th>
                          Bounce Reason
                        </th>

                        <th>
                          Returned Cheque
                        </th>

                        <th>Result</th>
                      </tr>
                    </thead>

                    <tbody>
                      {attempts.map(
                        (attempt) => {
                          const result =
                            getAttemptResult(
                              attempt
                            );

                          return (
                            <tr
                              key={
                                attempt.attemptNumber
                              }
                              className={
                                result.type ===
                                "not-reached"
                                  ? "bounce-summary-row-not-reached"
                                  : ""
                              }
                            >
                              {/* ATTEMPT */}

                              <td>
                                <div className="bounce-summary-attempt">
                                  <strong>
                                    Attempt{" "}
                                    {
                                      attempt.attemptNumber
                                    }
                                  </strong>

                                  <span>
                                    {
                                      attempt.type
                                    }
                                  </span>
                                </div>
                              </td>

                              {/* DEPOSIT DATE */}

                              <td>
                                {formatDateTime(
                                  attempt.depositDate
                                )}
                              </td>

                              {/* DEPOSITED BY */}

                              <td>
                                {
                                  attempt.depositedBy
                                }
                              </td>

                              {/* BANK / BRANCH */}

                              <td>
                                <div className="bounce-summary-bank">
                                  <strong>
                                    {
                                      attempt.bankName
                                    }
                                  </strong>

                                  <span>
                                    {
                                      attempt.bankBranch
                                    }
                                  </span>
                                </div>
                              </td>

                              {/* BOUNCE */}

                              <td>
                                {formatDateTime(
                                  attempt
                                    .bounceCycle
                                    ?.bounceDate
                                )}
                              </td>

                              {/* BOUNCE REASON */}

                              <td className="bounce-summary-reason">
                                {attempt
                                  .bounceCycle
                                  ?.bounceReason ||
                                  "—"}
                              </td>

                              {/* RETURN */}

                              <td>
                                {formatDateTime(
                                  attempt
                                    .bounceCycle
                                    ?.returnedChequeReceivedDate
                                )}
                              </td>

                              {/* RESULT */}

                              <td>
                                <div
                                  className={`bounce-summary-result ${result.type}`}
                                >
                                  <strong>
                                    {
                                      result.label
                                    }
                                  </strong>

                                  {result.type ===
                                    "cleared" && (
                                    <>
                                      <span>
                                        {formatDateTime(
                                          cheque?.chequeClearanceDate
                                        )}
                                      </span>

                                      <span>
                                        {cheque
                                          ?.amountDetails
                                          ?.currency ||
                                          "INR"}{" "}
                                        {cheque
                                          ?.clearanceDetails
                                          ?.clearedAmount ||
                                          cheque
                                            ?.amountDetails
                                            ?.chequeAmount ||
                                          "—"}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>

             
              </>
            )}
        </div>

        {/* ==========================
            FOOTER
        ========================== */}

        <div className="bounce-summary-modal-footer">
          <button
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Bounceredepositsummarymodal;