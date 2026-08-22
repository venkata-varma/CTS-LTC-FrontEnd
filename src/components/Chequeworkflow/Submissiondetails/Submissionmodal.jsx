import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiCalendar, FiFileText } from "react-icons/fi";
import { toast } from "react-toastify";

import { submitCheque } from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Submissionmodal.css";

function Submissionmodal({ cheque, onClose }) {
  const dispatch = useDispatch();

  const { submissionLoading } = useSelector(
    (state) => state.chequeTracking,
  );

  const [formData, setFormData] = useState({
    chequeFirstSubmissionDate: "",
    depositedBy: "",
    bankName: "",
    bankBranch: "",
    submissionNotes: "",
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

    if (!formData.chequeFirstSubmissionDate) {
      setFormError(
        "Please select the submission date and time.",
      );
      return;
    }

    if (!formData.depositedBy.trim()) {
      setFormError(
        "Please enter the staff member who deposited the cheque.",
      );
      return;
    }

    if (!formData.bankName.trim()) {
      setFormError(
        "Please enter the company bank name.",
      );
      return;
    }

    if (!formData.bankBranch.trim()) {
      setFormError(
        "Please enter the company bank branch.",
      );
      return;
    }

    /*
      datetime-local gives:
      2026-08-22T13:01

      Our backend expects a timezone-aware value:
      2026-08-22T13:01:00+05:30
    */
    const submissionDateWithTimezone =
      `${formData.chequeFirstSubmissionDate}:00+05:30`;

    const submissionData = {
      chequeFirstSubmissionDate:
        submissionDateWithTimezone,

      depositedBy: formData.depositedBy.trim(),

      bankName: formData.bankName.trim(),

      bankBranch: formData.bankBranch.trim(),

      submissionNotes:
        formData.submissionNotes.trim(),
    };

    try {
      const response = await dispatch(
        submitCheque({
          chequeId: cheque._id,
          submissionData,
        }),
      ).unwrap();

      toast.success(
        response.message ||
          "Cheque submission details recorded successfully.",
      );

      onClose();
    } catch (error) {
      setFormError(
        error ||
          "Failed to record cheque submission details.",
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
      className="submission-modal-overlay"
      onClick={
        submissionLoading ? undefined : onClose
      }
    >
      <div
        className="submission-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="submission-modal-header">
          <div>
            <h2>Record First Submission</h2>

            <p>
              Record the first deposit of this
              cheque to the bank.
            </p>
          </div>

          <button
            type="button"
            className="submission-modal-close"
            onClick={onClose}
            disabled={submissionLoading}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="submission-modal-body">
            <div className="submission-cheque-summary">
              <div className="submission-summary-item">
                <span>Cheque No</span>

                <strong>
                  {cheque?.chequeNo || "—"}
                </strong>
              </div>

              <div className="submission-summary-item">
                <span>Amount</span>

                <strong>
                  {cheque?.amountDetails?.currency?.trim() ||
                    "INR"}{" "}
                  {cheque?.amountDetails
                    ?.chequeAmount || "—"}
                </strong>
              </div>

              <div className="submission-summary-item">
                <span>Received Date</span>

                <strong>
                  {formatDate(
                    cheque?.chequeReceivedDate,
                  )}
                </strong>
              </div>
            </div>

            <div className="submission-form-group">
              <label htmlFor="chequeFirstSubmissionDate">
                Submission Date & Time
                <span> *</span>
              </label>

              <div className="submission-input-wrapper">
                <FiCalendar />

                <input
                  id="chequeFirstSubmissionDate"
                  type="datetime-local"
                  name="chequeFirstSubmissionDate"
                  value={
                    formData.chequeFirstSubmissionDate
                  }
                  onChange={handleChange}
                  disabled={submissionLoading}
                  required
                />
              </div>
            </div>

            <div className="submission-form-group">
              <label htmlFor="depositedBy">
                Deposited By <span>*</span>
              </label>

              <input
                id="depositedBy"
                type="text"
                name="depositedBy"
                value={formData.depositedBy}
                onChange={handleChange}
                placeholder="Enter staff member name"
                disabled={submissionLoading}
                required
              />
            </div>

            <div className="submission-form-row">
              <div className="submission-form-group">
                <label htmlFor="bankName">
                  Bank Name <span>*</span>
                </label>

                <input
                  id="bankName"
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Enter company bank name"
                  disabled={submissionLoading}
                  required
                />
              </div>

              <div className="submission-form-group">
                <label htmlFor="bankBranch">
                  Bank Branch <span>*</span>
                </label>

                <input
                  id="bankBranch"
                  type="text"
                  name="bankBranch"
                  value={formData.bankBranch}
                  onChange={handleChange}
                  placeholder="Enter company bank branch"
                  disabled={submissionLoading}
                  required
                />
              </div>
            </div>

            <div className="submission-form-group">
              <label htmlFor="submissionNotes">
                Submission Notes
              </label>

              <div className="submission-textarea-wrapper">
                <FiFileText />

                <textarea
                  id="submissionNotes"
                  name="submissionNotes"
                  value={formData.submissionNotes}
                  onChange={handleChange}
                  placeholder="Add any notes about this submission..."
                  rows="4"
                  disabled={submissionLoading}
                />
              </div>
            </div>

            {formError && (
              <div className="submission-form-error">
                {formError}
              </div>
            )}
          </div>

          <div className="submission-modal-footer">
            <button
              type="button"
              className="submission-cancel-btn"
              onClick={onClose}
              disabled={submissionLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submission-submit-btn"
              disabled={submissionLoading}
            >
              {submissionLoading
                ? "Recording..."
                : "Record Submission"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Submissionmodal;