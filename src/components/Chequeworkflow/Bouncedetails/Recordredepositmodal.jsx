import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiX,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";

import {
  getChequeBounceCycles,
  recordChequeRedeposit,
} from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Recordredepositmodal.css";

function Recordredepositmodal({ cheque, onClose }) {
  const dispatch = useDispatch();

  const {
    bounceCycles,
    bounceCyclesLoading,
    bounceCyclesError,
    redepositLoading,
  } = useSelector((state) => state.chequeTracking);

  const [formData, setFormData] = useState({
    redepositDate: "",
    redepositedBy: "",
    redepositBankName: "",
    redepositBankBranch: "",
    presentPlace: cheque?.presentPlace || "",
    redepositNotes: "",
  });

  const [formError, setFormError] = useState("");

  // ========================================
  // FETCH LATEST BOUNCE CYCLES
  // ========================================

  useEffect(() => {
    if (cheque?._id) {
      dispatch(getChequeBounceCycles(cheque._id));
    }
  }, [dispatch, cheque?._id]);

  // ========================================
  // SORT CYCLES BY BOUNCE NUMBER
  // ========================================

  const sortedBounceCycles = useMemo(() => {
    if (!bounceCycles?.length) {
      return [];
    }

    return [...bounceCycles].sort(
      (a, b) => a.bounceNumber - b.bounceNumber,
    );
  }, [bounceCycles]);

  // ========================================
  // CURRENT / LATEST BOUNCE
  // ========================================

  const currentBounceCycle = useMemo(() => {
    if (!sortedBounceCycles.length) {
      return null;
    }

    return sortedBounceCycles[
      sortedBounceCycles.length - 1
    ];
  }, [sortedBounceCycles]);

  // ========================================
  // PREVIOUS BOUNCE CYCLES
  // ========================================

  const previousBounceCycles = useMemo(() => {
    if (!currentBounceCycle) {
      return [];
    }

    return sortedBounceCycles.filter(
      (cycle) =>
        cycle._id !== currentBounceCycle._id,
    );
  }, [sortedBounceCycles, currentBounceCycle]);

  // ========================================
  // FORM CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  // ========================================
  // SUBMIT REDEPOSIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentBounceCycle) {
      setFormError(
        "No bounce cycle is available for redeposit.",
      );
      return;
    }

    if (!currentBounceCycle.returnedChequeReceivedDate) {
      setFormError(
        "Returned cheque receipt must be recorded before redeposit.",
      );
      return;
    }

    if (currentBounceCycle.redepositDate) {
      setFormError(
        `Redeposit has already been recorded for bounce #${currentBounceCycle.bounceNumber}.`,
      );
      return;
    }

    const requiredFields = [
      "redepositDate",
      "redepositedBy",
      "redepositBankName",
      "redepositBankBranch",
      "presentPlace",
    ];

    const hasMissingField = requiredFields.some(
      (field) => !formData[field]?.trim(),
    );

    if (hasMissingField) {
      setFormError(
        "Please fill all required fields.",
      );
      return;
    }

    const redepositDateWithTimezone =
      `${formData.redepositDate}:00+05:30`;

    const redepositData = {
      redepositDate: redepositDateWithTimezone,

      redepositedBy:
        formData.redepositedBy.trim(),

      redepositBankName:
        formData.redepositBankName.trim(),

      redepositBankBranch:
        formData.redepositBankBranch.trim(),

      presentPlace:
        formData.presentPlace.trim(),

      redepositNotes:
        formData.redepositNotes.trim(),
    };

    try {
      const response = await dispatch(
        recordChequeRedeposit({
          bounceCycleId: currentBounceCycle._id,
          redepositData,
        }),
      ).unwrap();

      toast.success(
        response.message ||
          `Cheque redeposit for bounce #${currentBounceCycle.bounceNumber} recorded successfully.`,
      );

      onClose();
    } catch (error) {
      setFormError(
        error ||
          "Failed to record cheque redeposit.",
      );
    }
  };

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
      },
    );
  };

  return (
    <div
      className="record-redeposit-overlay"
      onClick={
        redepositLoading ? undefined : onClose
      }
    >
      <div
        className="record-redeposit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="record-redeposit-header">
          <div>
            <h2>Record Redeposit</h2>

            <p>
              Record the cheque redeposit after
              receiving the returned physical
              cheque.
            </p>
          </div>

          <button
            type="button"
            className="record-redeposit-close"
            onClick={onClose}
            disabled={redepositLoading}
          >
            <FiX />
          </button>
        </div>

        {/* CHEQUE SUMMARY */}

        <div className="record-redeposit-cheque-summary">
          <div>
            <span>Cheque No</span>

            <strong>
              {cheque?.chequeNo || "—"}
            </strong>
          </div>

          <div>
            <span>Account Holder</span>

            <strong>
              {cheque?.accountHolderName || "—"}
            </strong>
          </div>

          <div>
            <span>Current Place</span>

            <strong>
              {cheque?.presentPlace || "—"}
            </strong>
          </div>
        </div>

        {/* BODY */}

        <div className="record-redeposit-body">
          {bounceCyclesLoading && (
            <div className="record-redeposit-message">
              Loading bounce details...
            </div>
          )}

          {!bounceCyclesLoading &&
            bounceCyclesError && (
              <div className="record-redeposit-error">
                {bounceCyclesError}
              </div>
            )}

          {!bounceCyclesLoading &&
            !bounceCyclesError &&
            !currentBounceCycle && (
              <div className="record-redeposit-message">
                No bounce record is available
                for this cheque.
              </div>
            )}

          {!bounceCyclesLoading &&
            !bounceCyclesError &&
            currentBounceCycle && (
              <>
                {/* ==========================
                    PREVIOUS CYCLES
                ========================== */}

                {previousBounceCycles.length >
                  0 && (
                  <div className="record-redeposit-history">
                    <h3>
                      Previous Bounce Cycles
                    </h3>

                    <p className="record-redeposit-history-help">
                      Previous completed cycles
                      are shown for reference.
                    </p>

                    {previousBounceCycles.map(
                      (cycle) => (
                        <div
                          key={cycle._id}
                          className="record-redeposit-history-card"
                        >
                          <div className="record-redeposit-history-heading">
                            <strong>
                              Bounce #
                              {cycle.bounceNumber}
                            </strong>

                            {cycle.redepositDate && (
                              <span>
                                <FiCheckCircle />
                                Redeposited
                              </span>
                            )}
                          </div>

                          <div className="record-redeposit-history-grid">
                            <div>
                              <span>
                                Bounce Date
                              </span>

                              <strong>
                                {formatDateTime(
                                  cycle.bounceDate,
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Returned Cheque
                                Received
                              </span>

                              <strong>
                                {formatDateTime(
                                  cycle.returnedChequeReceivedDate,
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Redeposit Date
                              </span>

                              <strong>
                                {formatDateTime(
                                  cycle.redepositDate,
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Redeposited By
                              </span>

                              <strong>
                                {cycle.redepositedBy ||
                                  "—"}
                              </strong>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                )}

                {/* ==========================
                    CURRENT BOUNCE
                ========================== */}

                <div className="record-redeposit-current-cycle">
                  <div className="record-redeposit-current-heading">
                    <div>
                      <span className="record-redeposit-current-label">
                        ACTIVE REDEPOSIT CYCLE
                      </span>

                      <h3>
                        Redeposit for Bounce #
                        {currentBounceCycle.bounceNumber}
                      </h3>
                    </div>

                    <span className="record-redeposit-current-badge">
                      Current Cycle
                    </span>
                  </div>

                  <div className="record-redeposit-current-details">
                    <div>
                      <span>
                        Bounce Date &amp; Time
                      </span>

                      <strong>
                        {formatDateTime(
                          currentBounceCycle.bounceDate,
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Returned Cheque Received
                      </span>

                      <strong>
                        {formatDateTime(
                          currentBounceCycle.returnedChequeReceivedDate,
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Bounce Reason
                      </span>

                      <strong>
                        {currentBounceCycle.bounceReason ||
                          "—"}
                      </strong>
                    </div>
                  </div>

                  <div className="record-redeposit-current-divider"></div>

                  {/* ==========================
                      NOT YET ELIGIBLE
                  ========================== */}

                  {!currentBounceCycle.returnedChequeReceivedDate && (
                    <div className="record-redeposit-warning">
                      Returned cheque receipt has
                      not yet been recorded for
                      Bounce #
                      {currentBounceCycle.bounceNumber}.
                      Record the returned cheque
                      receipt before redepositing
                      this cheque.
                    </div>
                  )}

                  {/* ==========================
                      ALREADY REDEPOSITED
                  ========================== */}

                  {currentBounceCycle.redepositDate && (
                    <div className="record-redeposit-completed">
                      <FiCheckCircle />

                      <div>
                        <strong>
                          Redeposit already recorded
                        </strong>

                        <span>
                          {formatDateTime(
                            currentBounceCycle.redepositDate,
                          )}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ==========================
                      FORM
                  ========================== */}

                  {currentBounceCycle.returnedChequeReceivedDate &&
                    !currentBounceCycle.redepositDate && (
                      <form
                        className="record-redeposit-form"
                        onSubmit={handleSubmit}
                      >
                        <div className="record-redeposit-form-title">
                          <h3>
                            Redeposit Details
                          </h3>

                          <p>
                            Enter where and when the
                            cheque is being
                            redeposited for Bounce #
                            {currentBounceCycle.bounceNumber}.
                          </p>
                        </div>

                        <div className="record-redeposit-form-grid">
                          <div className="record-redeposit-form-group">
                            <label>
                              Redeposit Date &amp;
                              Time <span>*</span>
                            </label>

                            <div className="record-redeposit-input-wrapper">
                              <FiCalendar />

                              <input
                                type="datetime-local"
                                name="redepositDate"
                                value={
                                  formData.redepositDate
                                }
                                onChange={
                                  handleChange
                                }
                                disabled={
                                  redepositLoading
                                }
                              />
                            </div>
                          </div>

                          <div className="record-redeposit-form-group">
                            <label>
                              Redeposited By{" "}
                              <span>*</span>
                            </label>

                            <input
                              type="text"
                              name="redepositedBy"
                              value={
                                formData.redepositedBy
                              }
                              onChange={handleChange}
                              placeholder="Person depositing the cheque"
                              disabled={
                                redepositLoading
                              }
                            />
                          </div>

                          <div className="record-redeposit-form-group">
                            <label>
                              Bank Name{" "}
                              <span>*</span>
                            </label>

                            <input
                              type="text"
                              name="redepositBankName"
                              value={
                                formData.redepositBankName
                              }
                              onChange={handleChange}
                              placeholder="Company bank name"
                              disabled={
                                redepositLoading
                              }
                            />
                          </div>

                          <div className="record-redeposit-form-group">
                            <label>
                              Bank Branch{" "}
                              <span>*</span>
                            </label>

                            <input
                              type="text"
                              name="redepositBankBranch"
                              value={
                                formData.redepositBankBranch
                              }
                              onChange={handleChange}
                              placeholder="Company bank branch"
                              disabled={
                                redepositLoading
                              }
                            />
                          </div>

                          <div className="record-redeposit-form-group record-redeposit-full-width">
                            <label>
                              Present Place{" "}
                              <span>*</span>
                            </label>

                            <div className="record-redeposit-input-wrapper">
                              <FiMapPin />

                              <input
                                type="text"
                                name="presentPlace"
                                value={
                                  formData.presentPlace
                                }
                                onChange={
                                  handleChange
                                }
                                placeholder="Current location of cheque"
                                disabled={
                                  redepositLoading
                                }
                              />
                            </div>
                          </div>

                          <div className="record-redeposit-form-group record-redeposit-full-width">
                            <label>
                              Notes{" "}
                              <small>
                                (Optional)
                              </small>
                            </label>

                            <textarea
                              name="redepositNotes"
                              value={
                                formData.redepositNotes
                              }
                              onChange={handleChange}
                              placeholder="Add any useful notes about this redeposit..."
                              rows="3"
                              disabled={
                                redepositLoading
                              }
                            />
                          </div>
                        </div>

                        {formError && (
                          <div className="record-redeposit-error">
                            {formError}
                          </div>
                        )}

                        <div className="record-redeposit-form-actions">
                          <button
                            type="button"
                            className="record-redeposit-cancel-btn"
                            onClick={onClose}
                            disabled={
                              redepositLoading
                            }
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="record-redeposit-submit-btn"
                            disabled={
                              redepositLoading
                            }
                          >
                            {redepositLoading
                              ? "Recording..."
                              : "Record Redeposit"}
                          </button>
                        </div>
                      </form>
                    )}
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}

export default Recordredepositmodal;