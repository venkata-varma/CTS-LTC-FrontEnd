import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import { recordChequeClearance } from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Recordclearancemodal.css";

const Recordclearancemodal = ({ cheque, onClose }) => {
  const dispatch = useDispatch();

  const { clearanceLoading, clearanceError } = useSelector(
    (state) => state.chequeTracking,
  );

  const chequeAmount = cheque?.amountDetails?.chequeAmount || "";

  const currency = cheque?.amountDetails?.currency?.trim() || "INR";

  const [formData, setFormData] = useState({
    clearanceDate: "",
    chequeAmount: chequeAmount,
    bankName: "",
    bankBranch: "",
    accountNumber: "",
    clearanceNotes: "",
  });

  // Keep cheque amount synchronized if cheque data changes.
  useEffect(() => {
    setFormData((previous) => ({
      ...previous,
      chequeAmount,
    }));
  }, [chequeAmount]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.clearanceDate ||
      !formData.chequeAmount ||
      !formData.bankName.trim() ||
      !formData.bankBranch.trim() ||
      !formData.accountNumber.trim()
    ) {
      toast.error("Please fill all required clearance details.");
      return;
    }

    const clearanceData = {
      clearanceDate: formData.clearanceDate,
      chequeAmount: formData.chequeAmount,
      bankName: formData.bankName.trim(),
      bankBranch: formData.bankBranch.trim(),
      accountNumber: formData.accountNumber.trim(),
      clearanceNotes: formData.clearanceNotes.trim(),
    };

    try {
      const response = await dispatch(
        recordChequeClearance({
          chequeId: cheque._id,
          clearanceData,
        }),
      ).unwrap();

      toast.success(
        response?.message || "Cheque clearance recorded successfully.",
      );

      onClose();
    } catch (error) {
      toast.error(error || "Failed to record cheque clearance.");
    }
  };

  return (
    <div className="record-clearance-overlay">
      <div className="record-clearance-modal">
        {/* HEADER */}
        <div className="record-clearance-header">
          <div>
            <h2>Record Clearance</h2>
            <p>
              Record the final clearance details after the cheque amount has
              been credited.
            </p>
          </div>

          <button
            type="button"
            className="record-clearance-close-icon"
            onClick={onClose}
            disabled={clearanceLoading}
          >
            <FiX />
          </button>
        </div>

        {/* CHEQUE BASIC DETAILS */}
        <div className="record-clearance-cheque-summary">
          <div className="record-clearance-summary-item">
            <span>Cheque No</span>
            <strong>{cheque?.chequeNo || "—"}</strong>
          </div>

          <div className="record-clearance-summary-item">
            <span>Account Holder</span>
            <strong>{cheque?.accountHolderName || "—"}</strong>
          </div>

          <div className="record-clearance-summary-item">
            <span>Cheque Amount</span>
            <strong>
              {currency} {chequeAmount || "—"}
            </strong>
          </div>

          <div className="record-clearance-summary-item">
            <span>Present Place</span>
            <strong>{cheque?.presentPlace || "—"}</strong>
          </div>
        </div>

        {/* FORM */}
        <form
          className="record-clearance-form"
          onSubmit={handleSubmit}
        >
          <div className="record-clearance-form-heading">
            <h3>Clearance Details</h3>
            <p>
              Enter the bank credit details for this cheque.
            </p>
          </div>

          <div className="record-clearance-form-grid">
            {/* CLEARANCE DATE */}
            <div className="record-clearance-field">
              <label htmlFor="clearanceDate">
                Clearance Date &amp; Time <span>*</span>
              </label>

              <input
                id="clearanceDate"
                type="datetime-local"
                name="clearanceDate"
                value={formData.clearanceDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* AMOUNT */}
            <div className="record-clearance-field">
              <label htmlFor="chequeAmount">
                Cheque Amount <span>*</span>
              </label>

              <div className="record-clearance-amount-wrapper">
                <span>{currency}</span>

                <input
                  id="chequeAmount"
                  type="text"
                  name="chequeAmount"
                  value={formData.chequeAmount}
                  readOnly
                />
              </div>

              <small>
                Amount is taken from the cheque and cannot be changed here.
              </small>
            </div>

            {/* BANK NAME */}
            <div className="record-clearance-field">
              <label htmlFor="bankName">
                Bank Name <span>*</span>
              </label>

              <input
                id="bankName"
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Bank where amount was credited"
                required
              />
            </div>

            {/* BANK BRANCH */}
            <div className="record-clearance-field">
              <label htmlFor="bankBranch">
                Bank Branch <span>*</span>
              </label>

              <input
                id="bankBranch"
                type="text"
                name="bankBranch"
                value={formData.bankBranch}
                onChange={handleChange}
                placeholder="Bank branch"
                required
              />
            </div>

            {/* ACCOUNT NUMBER */}
            <div className="record-clearance-field record-clearance-full-width">
              <label htmlFor="accountNumber">
                Credited Account Number <span>*</span>
              </label>

              <input
                id="accountNumber"
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Account number where amount was credited"
                required
              />
            </div>

            {/* NOTES */}
            <div className="record-clearance-field record-clearance-full-width">
              <label htmlFor="clearanceNotes">
                Clearance Notes <small>(Optional)</small>
              </label>

              <textarea
                id="clearanceNotes"
                name="clearanceNotes"
                value={formData.clearanceNotes}
                onChange={handleChange}
                placeholder="Add any additional clearance information..."
                rows="3"
              />
            </div>
          </div>

          {clearanceError && (
            <div className="record-clearance-error">
              {clearanceError}
            </div>
          )}

          {/* FOOTER */}
          <div className="record-clearance-actions">
            <button
              type="button"
              className="record-clearance-cancel-button"
              onClick={onClose}
              disabled={clearanceLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="record-clearance-submit-button"
              disabled={clearanceLoading}
            >
              {clearanceLoading
                ? "Recording Clearance..."
                : "Record Clearance"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recordclearancemodal;