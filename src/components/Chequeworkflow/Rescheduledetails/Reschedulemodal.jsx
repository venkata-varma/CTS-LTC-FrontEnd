import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";

import { rescheduleCheque } from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Reschedulemodal.css";

function Reschedulemodal({
  cheque,
  onClose,
}) {
  const dispatch = useDispatch();

  const { rescheduleLoading } = useSelector(
    (state) => state.chequeTracking,
  );

  const [formData, setFormData] = useState({
    newRescheduledDate: "",
    rescheduleReason: "",
  });

  const [formError, setFormError] = useState("");

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.newRescheduledDate) {
      setFormError(
        "Please select a new rescheduled date.",
      );
      return;
    }

    if (!formData.rescheduleReason.trim()) {
      setFormError(
        "Please enter a reason for rescheduling.",
      );
      return;
    }

    try {
      const response = await dispatch(
        rescheduleCheque({
          chequeId: cheque._id,
          rescheduleData: {
            newRescheduledDate:
              formData.newRescheduledDate,

            rescheduleReason:
              formData.rescheduleReason.trim(),
          },
        }),
      ).unwrap();

      toast.success(
        response.message ||
          "Cheque rescheduled successfully.",
      );

      onClose();
    } catch (error) {
      setFormError(
        error || "Failed to reschedule cheque.",
      );
    }
  };

  return (
    <div
      className="reschedule-modal-overlay"
      onClick={onClose}
    >
      <div
        className="reschedule-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="reschedule-modal-header">
          <div>
            <h2>Reschedule Cheque</h2>

            <p>
              Choose a new deposit date for this
              cheque.
            </p>
          </div>

          <button
            type="button"
            className="reschedule-modal-close-btn"
            onClick={onClose}
            disabled={rescheduleLoading}
            aria-label="Close reschedule modal"
          >
            <FiX />
          </button>
        </div>

        <form
          className="reschedule-modal-form"
          onSubmit={handleSubmit}
        >
          <div className="reschedule-cheque-summary">
            <div>
              <span>Cheque No</span>
              <strong>{cheque?.chequeNo}</strong>
            </div>

            <div>
              <span>Amount</span>

              <strong>
                {cheque?.amountDetails?.currency ||
                  "INR"}{" "}
                {cheque?.amountDetails
                  ?.chequeAmount || "—"}
              </strong>
            </div>
          </div>

          <div className="reschedule-current-info">
            <FiCalendar />

            <div>
              <span>
                Current Rescheduled Date
              </span>

              <strong>
                {formatDate(
                  cheque?.currentRescheduledDate,
                )}
              </strong>
            </div>
          </div>

          <div className="reschedule-form-field">
            <label htmlFor="newRescheduledDate">
              New Rescheduled Date
              <span> *</span>
            </label>

            <input
              id="newRescheduledDate"
              name="newRescheduledDate"
              type="date"
              value={
                formData.newRescheduledDate
              }
              onChange={handleChange}
              disabled={rescheduleLoading}
            />
          </div>

          <div className="reschedule-form-field">
            <label htmlFor="rescheduleReason">
              Reason
              <span> *</span>
            </label>

            <textarea
              id="rescheduleReason"
              name="rescheduleReason"
              rows="4"
              placeholder="Enter the customer's reason or a short note..."
              value={formData.rescheduleReason}
              onChange={handleChange}
              disabled={rescheduleLoading}
            />
          </div>

          {formError && (
            <div className="reschedule-form-error">
              {formError}
            </div>
          )}

          <div className="reschedule-modal-actions">
            <button
              type="button"
              className="reschedule-cancel-btn"
              onClick={onClose}
              disabled={rescheduleLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="reschedule-submit-btn"
              disabled={rescheduleLoading}
            >
              {rescheduleLoading
                ? "Rescheduling..."
                : "Reschedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reschedulemodal;