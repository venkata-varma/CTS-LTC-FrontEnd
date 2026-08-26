import { useEffect, useState } from "react";
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
  recordReturnedChequeReceipt,
} from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Returnedchequereceiptmodal.css";

function Returnedchequereceiptmodal({
  cheque,
  onClose,
}) {
  const dispatch = useDispatch();

  const {
    bounceCycles,
    bounceCyclesLoading,
    bounceCyclesError,
    returnedReceiptLoading,
  } = useSelector(
    (state) => state.chequeTracking,
  );

  /*
    Form data is stored separately for every
    bounce cycle.

    Example:

    {
      bounceCycleId1: {
        returnedChequeReceivedDate: "",
        presentPlace: "Office"
      },

      bounceCycleId2: {
        returnedChequeReceivedDate: "",
        presentPlace: "Office"
      }
    }
  */
  const [receiptForms, setReceiptForms] =
    useState({});

  const [formErrors, setFormErrors] =
    useState({});

  // ========================================
  // FETCH BOUNCE CYCLES WHEN MODAL OPENS
  // ========================================

  useEffect(() => {
    if (cheque?._id) {
      dispatch(
        getChequeBounceCycles(cheque._id),
      );
    }
  }, [dispatch, cheque?._id]);

  // ========================================
  // PREPARE FORM FOR PENDING BOUNCES
  // ========================================

  useEffect(() => {
    if (!bounceCycles?.length) {
      return;
    }

    setReceiptForms((previousForms) => {
      const updatedForms = {
        ...previousForms,
      };

      bounceCycles.forEach((cycle) => {
        /*
          No form is required when receipt
          has already been recorded.
        */
        if (
          !cycle.returnedChequeReceivedDate &&
          !updatedForms[cycle._id]
        ) {
          updatedForms[cycle._id] = {
            returnedChequeReceivedDate: "",
            presentPlace:
              cheque?.presentPlace || "Office",
          };
        }
      });

      return updatedForms;
    });
  }, [
    bounceCycles,
    cheque?.presentPlace,
  ]);

  // ========================================
  // CHANGE FORM VALUE
  // ========================================

  const handleChange = (
    bounceCycleId,
    field,
    value,
  ) => {
    setReceiptForms((previousForms) => ({
      ...previousForms,

      [bounceCycleId]: {
        ...previousForms[bounceCycleId],
        [field]: value,
      },
    }));

    /*
      Clear error only for the bounce
      currently being edited.
    */
    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [bounceCycleId]: "",
    }));
  };

  // ========================================
  // SUBMIT ONE BOUNCE RECEIPT
  // ========================================

  const handleSubmit = async (
    bounceCycle,
  ) => {
    const form =
      receiptForms[bounceCycle._id];

    if (
      !form?.returnedChequeReceivedDate
    ) {
      setFormErrors((previousErrors) => ({
        ...previousErrors,

        [bounceCycle._id]:
          "Please select the returned cheque received date and time.",
      }));

      return;
    }

    if (!form?.presentPlace?.trim()) {
      setFormErrors((previousErrors) => ({
        ...previousErrors,

        [bounceCycle._id]:
          "Please enter the present place of the cheque.",
      }));

      return;
    }

    /*
      Same datetime convention used by
      Submission and Record Bounce.

      datetime-local:
      2026-08-26T11:15

      API:
      2026-08-26T11:15:00+05:30
    */
    const returnedDateWithTimezone =
      `${form.returnedChequeReceivedDate}:00+05:30`;

    const receiptData = {
      returnedChequeReceivedDate:
        returnedDateWithTimezone,

      presentPlace:
        form.presentPlace.trim(),
    };

    try {
      const response = await dispatch(
        recordReturnedChequeReceipt({
          bounceCycleId:
            bounceCycle._id,

          receiptData,
        }),
      ).unwrap();

      toast.success(
        response.message ||
          `Returned cheque receipt for bounce #${bounceCycle.bounceNumber} recorded successfully.`,
      );

      /*
        Do NOT close modal.

        Redux replaces this particular
        bounce cycle with the updated cycle.

        Therefore the form for this bounce
        immediately becomes read-only.
      */
    } catch (error) {
      setFormErrors((previousErrors) => ({
        ...previousErrors,

        [bounceCycle._id]:
          error ||
          "Failed to record returned cheque receipt.",
      }));
    }
  };

  // ========================================
  // FORMAT DATE & TIME
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
      className="returned-receipt-modal-overlay"
      onClick={
        returnedReceiptLoading
          ? undefined
          : onClose
      }
    >
      <div
        className="returned-receipt-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* HEADER */}

        <div className="returned-receipt-modal-header">
          <div>
            <h2>
              Returned Cheque Receipt
            </h2>

            <p>
              Record when the physical
              cheque was received after
              each bounce.
            </p>
          </div>

          <button
            type="button"
            className="returned-receipt-modal-close"
            onClick={onClose}
            disabled={
              returnedReceiptLoading
            }
          >
            <FiX />
          </button>
        </div>

        {/* CHEQUE SUMMARY */}

        <div className="returned-receipt-cheque-summary">
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
            <span>Current Place</span>

            <strong>
              {cheque?.presentPlace ||
                "Office"}
            </strong>
          </div>
        </div>

        {/* BODY */}

        <div className="returned-receipt-modal-body">
          {bounceCyclesLoading && (
            <div className="returned-receipt-loading">
              Loading bounce details...
            </div>
          )}

          {!bounceCyclesLoading &&
            bounceCyclesError && (
              <div className="returned-receipt-main-error">
                {bounceCyclesError}
              </div>
            )}

          {!bounceCyclesLoading &&
            !bounceCyclesError &&
            bounceCycles?.length === 0 && (
              <div className="returned-receipt-empty">
                No bounce records are
                available for this cheque.
              </div>
            )}

          {!bounceCyclesLoading &&
            !bounceCyclesError &&
            bounceCycles?.map(
              (bounceCycle) => {
                const receiptRecorded =
                  Boolean(
                    bounceCycle
                      .returnedChequeReceivedDate,
                  );

                const currentForm =
                  receiptForms[
                    bounceCycle._id
                  ];

                const currentError =
                  formErrors[
                    bounceCycle._id
                  ];

                return (
                  <div
                    key={bounceCycle._id}
                    className="returned-receipt-bounce-section"
                  >
                    {/* BOUNCE HEADING */}

                    <div className="returned-receipt-bounce-heading">
                      <div>
                        <span className="returned-receipt-bounce-number">
                          Bounce #
                          {
                            bounceCycle.bounceNumber
                          }
                        </span>

                        <span
                          className={
                            receiptRecorded
                              ? "returned-receipt-status recorded"
                              : "returned-receipt-status pending"
                          }
                        >
                          {receiptRecorded
                            ? "Receipt Recorded"
                            : "Receipt Pending"}
                        </span>
                      </div>
                    </div>

                    {/* EXISTING BOUNCE DETAILS */}

                    <div className="returned-receipt-bounce-details">
                      <div>
                        <span>
                          Bounce Date &amp;
                          Time
                        </span>

                        <strong>
                          {formatDateTime(
                            bounceCycle.bounceDate,
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>
                          Place After Bounce
                        </span>

                        <strong>
                          {bounceCycle.presentPlaceAfterBounce ||
                            "—"}
                        </strong>
                      </div>

                      <div className="returned-receipt-reason">
                        <span>
                          Bounce Reason
                        </span>

                        <strong>
                          {bounceCycle.bounceReason ||
                            "—"}
                        </strong>
                      </div>
                    </div>

                    {/* ALREADY RECORDED */}

                    {receiptRecorded && (
                      <div className="returned-receipt-recorded-box">
                        <div className="returned-receipt-recorded-icon">
                          <FiCheckCircle />
                        </div>

                        <div>
                          <span>
                            Returned Cheque
                            Received
                          </span>

                          <strong>
                            {formatDateTime(
                              bounceCycle.returnedChequeReceivedDate,
                            )}
                          </strong>
                        </div>
                      </div>
                    )}

                    {/* PENDING RECEIPT FORM */}

                    {!receiptRecorded && (
                      <div className="returned-receipt-form-area">
                        <div className="returned-receipt-form-group">
                          <label
                            htmlFor={`returned-date-${bounceCycle._id}`}
                          >
                            Returned Cheque
                            Received Date &amp;
                            Time
                            <span> *</span>
                          </label>

                          <div className="returned-receipt-input-wrapper">
                            <FiCalendar />

                            <input
                              id={`returned-date-${bounceCycle._id}`}
                              type="datetime-local"
                              value={
                                currentForm?.returnedChequeReceivedDate ||
                                ""
                              }
                              onChange={(e) =>
                                handleChange(
                                  bounceCycle._id,
                                  "returnedChequeReceivedDate",
                                  e.target.value,
                                )
                              }
                              disabled={
                                returnedReceiptLoading
                              }
                            />
                          </div>
                        </div>

                        <div className="returned-receipt-form-group">
                          <label
                            htmlFor={`present-place-${bounceCycle._id}`}
                          >
                            Present Place
                            <span> *</span>
                          </label>

                          <div className="returned-receipt-input-wrapper">
                            <FiMapPin />

                            <input
                              id={`present-place-${bounceCycle._id}`}
                              type="text"
                              value={
                                currentForm?.presentPlace ||
                                ""
                              }
                              onChange={(e) =>
                                handleChange(
                                  bounceCycle._id,
                                  "presentPlace",
                                  e.target.value,
                                )
                              }
                              placeholder="Current location of cheque"
                              disabled={
                                returnedReceiptLoading
                              }
                            />
                          </div>
                        </div>

                        {currentError && (
                          <div className="returned-receipt-form-error">
                            {currentError}
                          </div>
                        )}

                        <div className="returned-receipt-form-actions">
                          <button
                            type="button"
                            className="returned-receipt-save-btn"
                            onClick={() =>
                              handleSubmit(
                                bounceCycle,
                              )
                            }
                            disabled={
                              returnedReceiptLoading
                            }
                          >
                            {returnedReceiptLoading
                              ? "Recording..."
                              : `Record Receipt for Bounce #${bounceCycle.bounceNumber}`}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              },
            )}
        </div>

        {/* FOOTER */}

        <div className="returned-receipt-modal-footer">
          <button
            type="button"
            onClick={onClose}
            disabled={
              returnedReceiptLoading
            }
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Returnedchequereceiptmodal;