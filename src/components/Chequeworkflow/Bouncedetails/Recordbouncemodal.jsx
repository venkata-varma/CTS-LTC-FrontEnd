import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiX,
  FiCalendar,
  FiMapPin,
  FiAlertCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { recordChequeBounce } from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Recordbouncemodal.css";

function Recordbouncemodal({ cheque, onClose }) {
  const dispatch = useDispatch();

  const { bounceLoading } = useSelector(
    (state) => state.chequeTracking,
  );

  const [formData, setFormData] = useState({
    bounceDate: "",
    bounceReason: "",
    presentPlace: cheque?.presentPlace || "Office",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.bounceDate) {
      setFormError(
        "Please select the bounce date and time.",
      );
      return;
    }

    if (!formData.bounceReason.trim()) {
      setFormError(
        "Please enter the bounce reason.",
      );
      return;
    }

    if (!formData.presentPlace.trim()) {
      setFormError(
        "Please enter the present place of the cheque.",
      );
      return;
    }

    /*
      datetime-local gives:
      2026-08-24T14:30

      Same convention currently used by
      Submissionmodal:
      2026-08-24T14:30:00+05:30
    */
    const bounceDateWithTimezone =
      `${formData.bounceDate}:00+05:30`;

    const bounceData = {
      bounceDate: bounceDateWithTimezone,

      bounceReason: formData.bounceReason.trim(),

      presentPlace: formData.presentPlace.trim(),
    };

    try {
      const response = await dispatch(
        recordChequeBounce({
          chequeId: cheque._id,
          bounceData,
        }),
      ).unwrap();

      toast.success(
        response.message ||
          "Cheque bounce recorded successfully.",
      );

      onClose();
    } catch (error) {
      setFormError(
        error || "Failed to record cheque bounce.",
      );
    }
  };

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

  return (
    <div
      className="bounce-modal-overlay"
      onClick={bounceLoading ? undefined : onClose}
    >
      <div
        className="bounce-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bounce-modal-header">
          <div>
            <h2>Record Cheque Bounce</h2>

            <p>
              Record the bank return details for this
              cheque.
            </p>
          </div>

          <button
            type="button"
            className="bounce-modal-close"
            onClick={onClose}
            disabled={bounceLoading}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bounce-modal-body">
            {/* Cheque summary */}
            <div className="bounce-modal-summary">
              <div className="bounce-modal-summary-item">
                <span>Cheque No</span>

                <strong>
                  {cheque?.chequeNo || "—"}
                </strong>
              </div>

              <div className="bounce-modal-summary-item">
                <span>Amount</span>

                <strong>
                  {cheque?.amountDetails?.currency?.trim() ||
                    "INR"}{" "}
                  {cheque?.amountDetails
                    ?.chequeAmount || "—"}
                </strong>
              </div>

              <div className="bounce-modal-summary-item">
                <span>Submitted Date</span>

                <strong>
                  {formatDate(
                    cheque?.chequeSubmittedDate,
                  )}
                </strong>
              </div>
            </div>

            {/* Bounce date */}
            <div className="bounce-modal-form-group">
              <label htmlFor="bounceDate">
                Bounce Date &amp; Time
                <span> *</span>
              </label>

              <div className="bounce-modal-input-wrapper">
                <FiCalendar />

                <input
                  id="bounceDate"
                  type="datetime-local"
                  name="bounceDate"
                  value={formData.bounceDate}
                  onChange={handleChange}
                  disabled={bounceLoading}
                  required
                />
              </div>
            </div>

            {/* Bounce reason */}
            <div className="bounce-modal-form-group">
              <label htmlFor="bounceReason">
                Bounce Reason <span>*</span>
              </label>

              <div className="bounce-modal-textarea-wrapper">
                <FiAlertCircle />

                <textarea
                  id="bounceReason"
                  name="bounceReason"
                  value={formData.bounceReason}
                  onChange={handleChange}
                  placeholder="Enter the reason for cheque bounce..."
                  rows="4"
                  disabled={bounceLoading}
                  required
                />
              </div>
            </div>

            {/* Present place */}
            <div className="bounce-modal-form-group">
              <label htmlFor="presentPlace">
                Present Place <span>*</span>
              </label>

              <div className="bounce-modal-input-wrapper">
                <FiMapPin />

                <input
                  id="presentPlace"
                  type="text"
                  name="presentPlace"
                  value={formData.presentPlace}
                  onChange={handleChange}
                  placeholder="Enter current location of cheque"
                  disabled={bounceLoading}
                  required
                />
              </div>

              <span className="bounce-modal-field-help">
                Current location is prefilled. Change it
                if the cheque is now at a different place.
              </span>
            </div>

            {formError && (
              <div className="bounce-modal-form-error">
                {formError}
              </div>
            )}
          </div>

          <div className="bounce-modal-footer">
            <button
              type="button"
              className="bounce-modal-cancel-btn"
              onClick={onClose}
              disabled={bounceLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bounce-modal-submit-btn"
              disabled={bounceLoading}
            >
              {bounceLoading
                ? "Recording..."
                : "Record Bounce"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Recordbouncemodal;