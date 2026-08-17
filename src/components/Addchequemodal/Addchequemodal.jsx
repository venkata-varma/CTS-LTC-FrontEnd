import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

import "./Addchequemodal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addchequemodal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currency: "INR",
      status: "received",
    },
  });
  const selectedChequeFile = watch("cheque");
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      setSubmitError("");

      const formData = new FormData();

      formData.append("chequeNo", data.chequeNo);

      formData.append("chequeDate", data.chequeDate);

      formData.append("chequeAmount", data.chequeAmount);

      formData.append("currency", data.currency);

      formData.append("accountHolderName", data.accountHolderName);

      formData.append("customerCompanyName", data.customerCompanyName);

      formData.append("customerBankName", data.customerBankName);

      formData.append("customerBankBranchname", data.customerBankBranchname);

      formData.append("customerAccountNumber", data.customerAccountNumber);

      formData.append("customerBankIFSC", data.customerBankIFSC);

      formData.append("chequeReceivedDate", data.chequeReceivedDate);

      formData.append("invoiceNo", data.invoiceNo);

      formData.append("status", data.status);

      if (data.chequeSubmittedDate) {
        formData.append("chequeSubmittedDate", data.chequeSubmittedDate);
      }

      if (data.chequeClearanceDate) {
        formData.append("chequeClearanceDate", data.chequeClearanceDate);
      }

      if (data.chequeReturnedDate) {
        formData.append("chequeReturnedDate", data.chequeReturnedDate);
      }

      if (data.cheque?.[0]) {
        formData.append("cheque", data.cheque[0]);
      }

      const response = await fetch(
        "http://localhost:1300/cheque/register-received-cheque",
        {
          method: "POST",

          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to register the cheque");
      }

      console.log("Cheque registered successfully:", result);

      toast.success(result.message || "Cheque registered successfully");

      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.error("Cheque registration failed:", error);

      setSubmitError(
        error.message || "Something went wrong while registering the cheque.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleNext = async () => {
    // =============================
    // Validate Step 1
    // =============================

    if (currentStep === 1) {
      const isStepValid = await trigger([
        "chequeNo",
        "chequeDate",
        "chequeAmount",
        "currency",
        "chequeReceivedDate",
      ]);

      if (!isStepValid) {
        return;
      }

      setCurrentStep(2);
      return;
    }

    // =============================
    // Validate Step 2
    // =============================

    if (currentStep === 2) {
      const isStepValid = await trigger([
        "accountHolderName",
        "customerCompanyName",
        "customerBankName",
        "customerBankBranchname",
        "customerAccountNumber",
        "customerBankIFSC",
      ]);

      if (!isStepValid) {
        return;
      }

      setCurrentStep(3);
      return;
    }

    // =============================
    // Validate Step 3
    // =============================

    if (currentStep === 3) {
      const isStepValid = await trigger(["invoiceNo", "status"]);

      if (!isStepValid) {
        return;
      }

      setCurrentStep(4);
      return;
    }
    // =============================
    // Step 4
    // =============================

    // =============================
    // Validate Step 4
    // =============================

    if (currentStep === 4) {
      setCurrentStep(5);
      return;
    }
    // =============================
    // Validate Step 5
    // =============================

    if (currentStep === 5) {
      const isStepValid = await trigger("cheque");

      if (!isStepValid) {
        return;
      }

      setCurrentStep(6);
      return;
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };
  return (
    <>
      <div
        className="add-cheque-modal-overlay"
        //   onClick={onClose}
      >
        <div
          className="add-cheque-modal"
          onClick={(event) => event.stopPropagation()}
        >
          {/* ============================= */}
          {/* MODAL HEADER */}
          {/* ============================= */}

          <div className="add-cheque-modal-header">
            <div>
              <h2>Register New Cheque</h2>

              <p>Add the cheque details step by step.</p>
            </div>

            <button
              type="button"
              className="add-cheque-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FiX />
            </button>
          </div>

          {/* ============================= */}
          {/* FORM */}
          {/* ============================= */}

          <form>
            <div className="add-cheque-modal-body">
              {/* ============================= */}
              {/* STEP 1 — CHEQUE DETAILS */}
              {/* ============================= */}

              {currentStep === 1 && (
                <>
                  <div className="form-step-heading">
                    <span className="form-step-number">Step 1 of 5</span>

                    <h3>Cheque Details</h3>

                    <p>Enter the basic cheque information.</p>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="chequeNo">
                        Cheque Number <span className="required-mark">*</span>
                      </label>

                      <input
                        id="chequeNo"
                        type="text"
                        placeholder="Enter cheque number"
                        {...register("chequeNo", {
                          required: "Cheque number is required",

                          minLength: {
                            value: 3,
                            message:
                              "Cheque number must contain at least 3 characters",
                          },
                        })}
                      />

                      {errors.chequeNo && (
                        <span className="form-error">
                          {errors.chequeNo.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="chequeDate">
                        Cheque Date <span className="required-mark">*</span>
                      </label>

                      <input
                        id="chequeDate"
                        type="date"
                        {...register("chequeDate", {
                          required: "Cheque date is required",
                        })}
                      />

                      {errors.chequeDate && (
                        <span className="form-error">
                          {errors.chequeDate.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="chequeAmount">Cheque Amount</label>

                      <input
                        id="chequeAmount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter cheque amount"
                        {...register("chequeAmount", {
                          required: "Cheque amount is required",

                          min: {
                            value: 0.01,
                            message: "Cheque amount must be greater than zero",
                          },
                        })}
                      />

                      {errors.chequeAmount && (
                        <span className="form-error">
                          {errors.chequeAmount.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="currency">
                        Currency <span className="required-mark">*</span>
                      </label>

                      <select
                        id="currency"
                        {...register("currency", {
                          required: "Currency is required",
                        })}
                      >
                        <option value="INR">INR</option>

                        <option value="USD">USD</option>

                        <option value="EUR">EUR</option>
                      </select>

                      {errors.currency && (
                        <span className="form-error">
                          {errors.currency.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="chequeReceivedDate">
                        Cheque Received Date
                        <span className="required-mark">*</span>
                      </label>

                      <input
                        id="chequeReceivedDate"
                        type="date"
                        {...register("chequeReceivedDate", {
                          required: "Cheque received date is required",
                        })}
                      />

                      {errors.chequeReceivedDate && (
                        <span className="form-error">
                          {errors.chequeReceivedDate.message}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ============================= */}
              {/* STEP 2 — CUSTOMER & BANK */}
              {/* ============================= */}

              {currentStep === 2 && (
                <>
                  <div className="form-step-heading">
                    <span className="form-step-number">Step 2 of 5</span>

                    <h3>Customer and Bank Details</h3>

                    <p>Enter the customer and bank information.</p>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="accountHolderName">
                        Account Holder Name
                        <span className="required-mark">*</span>
                      </label>

                      <input
                        id="accountHolderName"
                        type="text"
                        placeholder="Enter account holder name"
                        {...register("accountHolderName", {
                          required: "Account holder name is required",

                          minLength: {
                            value: 2,
                            message:
                              "Account holder name must contain at least 2 characters",
                          },
                        })}
                      />

                      {errors.accountHolderName && (
                        <span className="form-error">
                          {errors.accountHolderName.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="customerCompanyName">
                        Customer Company Name
                      </label>

                      <input
                        id="customerCompanyName"
                        type="text"
                        placeholder="Enter customer company name"
                        {...register("customerCompanyName", {
                          required: "Customer company name is required",

                          minLength: {
                            value: 2,
                            message:
                              "Customer company name must contain at least 2 characters",
                          },
                        })}
                      />

                      {errors.customerCompanyName && (
                        <span className="form-error">
                          {errors.customerCompanyName.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="customerBankName">
                        Customer Bank Name
                        <span className="required-mark">*</span>
                      </label>

                      <input
                        id="customerBankName"
                        type="text"
                        placeholder="Enter bank name"
                        {...register("customerBankName", {
                          required: "Customer bank name is required",
                        })}
                      />

                      {errors.customerBankName && (
                        <span className="form-error">
                          {errors.customerBankName.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="customerBankBranchname">
                        Customer Bank Branch
                      </label>

                      <input
                        id="customerBankBranchname"
                        type="text"
                        placeholder="Enter bank branch"
                        {...register("customerBankBranchname", {
                          required: "Customer bank branch is required",
                        })}
                      />

                      {errors.customerBankBranchname && (
                        <span className="form-error">
                          {errors.customerBankBranchname.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="customerAccountNumber">
                        Customer Account Number
                        <span className="required-mark">*</span>
                      </label>

                      <input
                        id="customerAccountNumber"
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter account number"
                        {...register("customerAccountNumber", {
                          required: "Customer account number is required",

                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Account number must contain only numbers",
                          },

                          minLength: {
                            value: 9,
                            message:
                              "Account number must contain at least 9 digits",
                          },

                          maxLength: {
                            value: 18,
                            message: "Account number cannot exceed 18 digits",
                          },
                        })}
                      />

                      {errors.customerAccountNumber && (
                        <span className="form-error">
                          {errors.customerAccountNumber.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="customerBankIFSC">
                        Customer Bank IFSC
                        <span className="required-mark">*</span>
                      </label>

                      <input
                        id="customerBankIFSC"
                        type="text"
                        placeholder="Example: SBIN0001234"
                        style={{
                          textTransform: "uppercase",
                        }}
                        {...register("customerBankIFSC", {
                          required: "Customer bank IFSC is required",

                          // pattern: {
                          //   value: /^[A-Z]{4}0[A-Z0-9]{6}$/,

                          //   message: "Enter a valid IFSC code",
                          // },
                        })}
                      />

                      {errors.customerBankIFSC && (
                        <span className="form-error">
                          {errors.customerBankIFSC.message}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ============================= */}
              {/* STEP 3 — INVOICE & STATUS */}
              {/* ============================= */}

              {currentStep === 3 && (
                <>
                  <div className="form-step-heading">
                    <span className="form-step-number">Step 3 of 5</span>

                    <h3>Invoice and Status Details</h3>

                    <p>Enter the invoice number and current cheque status.</p>
                  </div>

                  <div className="form-grid">
                    {/* Invoice Number */}

                    <div className="form-group">
                      <label htmlFor="invoiceNo">
                        Invoice Number<span className="required-mark">*</span>
                      </label>

                      <input
                        id="invoiceNo"
                        type="text"
                        placeholder="Example: INV-2026-1041"
                        {...register("invoiceNo", {
                          required: "Invoice number is required",

                          minLength: {
                            value: 3,
                            message:
                              "Invoice number must contain at least 3 characters",
                          },
                        })}
                      />

                      {errors.invoiceNo && (
                        <span className="form-error">
                          {errors.invoiceNo.message}
                        </span>
                      )}
                    </div>

                    {/* Status */}

                    <div className="form-group">
                      <label htmlFor="status">
                        Cheque Status<span className="required-mark">*</span>
                      </label>

                      <select
                        id="status"
                        {...register("status", {
                          required: "Cheque status is required",
                        })}
                      >
                        <option value="received">Received</option>

                        <option value="pending-submission">
                          Pending Submission
                        </option>

                        <option value="submitted">Submitted</option>

                        <option value="cleared">Cleared</option>

                        <option value="returned">Returned</option>

                        <option value="bounced">Bounced</option>
                      </select>

                      {errors.status && (
                        <span className="form-error">
                          {errors.status.message}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ============================= */}
              {/* STEP 4 — Important dates of Cheque - 
            Cleared date; Submitted date; Bounced/Returned date */}
              {/* ============================= */}

              {currentStep === 4 && (
                <>
                  <div className="form-step-heading">
                    <span className="form-step-number">Step 4 of 5</span>

                    <h3>Cheque Processing Dates</h3>

                    <p>Add the relevant processing dates, if available.</p>
                  </div>

                  <div className="form-grid">
                    {/* Cheque Submitted Date */}

                    <div className="form-group">
                      <label htmlFor="chequeSubmittedDate">
                        Cheque Submitted Date
                      </label>

                      <input
                        id="chequeSubmittedDate"
                        type="date"
                        {...register("chequeSubmittedDate")}
                      />
                    </div>

                    {/* Cheque Clearance Date */}

                    <div className="form-group">
                      <label htmlFor="chequeClearanceDate">
                        Cheque Clearance Date
                      </label>

                      <input
                        id="chequeClearanceDate"
                        type="date"
                        {...register("chequeClearanceDate")}
                      />
                    </div>

                    {/* Cheque Returned Date */}

                    <div className="form-group">
                      <label htmlFor="chequeReturnedDate">
                        Cheque Returned Date
                      </label>

                      <input
                        id="chequeReturnedDate"
                        type="date"
                        {...register("chequeReturnedDate")}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ============================= */}
              {/* STEP 5 — CHEQUE IMAGE */}
              {/* ============================= */}

              {currentStep === 5 && (
                <>
                  <div className="form-step-heading">
                    <span className="form-step-number">Step 5 of 6</span>

                    <h3>Upload Cheque Image</h3>

                    <p>Upload a clear image of the received cheque.</p>
                  </div>

                  <div className="cheque-upload-container">
                    <div className="cheque-upload-icon">📄</div>

                    <h4>Upload Cheque Image</h4>

                    <p className="cheque-upload-description">
                      Supported formats: JPG, JPEG, PNG, WEBP and SVG. Maximum
                      file size: 5 MB.
                    </p>

                    <label htmlFor="cheque" className="cheque-upload-label">
                      Choose Image<span className="required-mark">*</span>
                    </label>

                    <input
                      id="cheque"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.svg,image/jpeg,image/png,image/webp,image/svg+xml"
                      className="cheque-file-input"
                      {...register("cheque", {
                        required: "Cheque image is required",

                        validate: {
                          validFileType: (files) => {
                            const file = files?.[0];

                            if (!file) {
                              return "Cheque image is required";
                            }

                            const allowedTypes = [
                              "image/jpeg",
                              "image/jpg",
                              "image/png",
                              "image/webp",
                              "image/svg+xml",
                            ];

                            return (
                              allowedTypes.includes(file.type) ||
                              "Only JPG, JPEG, PNG, WEBP and SVG images are allowed"
                            );
                          },

                          fileSize: (files) => {
                            const file = files?.[0];

                            if (!file) {
                              return true;
                            }

                            const maximumSize = 5 * 1024 * 1024;

                            return (
                              file.size <= maximumSize ||
                              "Image size must not exceed 5 MB"
                            );
                          },
                        },

                        onChange: async () => {
                          await trigger("cheque");
                        },
                      })}
                    />

                    {selectedChequeFile?.[0] && !errors.cheque && (
                      <div className="selected-file-info">
                        <div className="selected-file-icon">✓</div>

                        <div className="selected-file-details">
                          <span className="selected-file-name">
                            {selectedChequeFile[0].name}
                          </span>
                        </div>
                      </div>
                    )}

                    {errors.cheque && (
                      <span className="form-error">
                        {errors.cheque.message}
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* ============================= */}
              {/* STEP 6 — REVIEW & SUBMIT */}
              {/* ============================= */}

              {currentStep === 6 && (
                <>
                  <div className="form-step-heading">
                    <span className="form-step-number">Step 6 of 6</span>

                    <h3>Review and Submit</h3>

                    <p>Review the cheque information before submitting.</p>
                  </div>

                  <div className="review-container">
                    {/* ============================= */}
                    {/* CHEQUE DETAILS */}
                    {/* ============================= */}

                    <div className="review-section">
                      <div className="review-section-header">
                        <h4>Cheque Details</h4>

                        <button
                          type="button"
                          className="review-edit-btn"
                          onClick={() => handleEditStep(1)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="review-grid">
                        <div className="review-item">
                          <span>Cheque Number</span>

                          <strong>{getValues("chequeNo")}</strong>
                        </div>

                        <div className="review-item">
                          <span>Cheque Date</span>

                          <strong>{getValues("chequeDate")}</strong>
                        </div>

                        <div className="review-item">
                          <span>Cheque Amount</span>

                          <strong>
                            {getValues("currency")} {getValues("chequeAmount")}
                          </strong>
                        </div>

                        <div className="review-item">
                          <span>Cheque Received Date</span>

                          <strong>{getValues("chequeReceivedDate")}</strong>
                        </div>
                      </div>
                    </div>

                    {/* ============================= */}
                    {/* CUSTOMER AND BANK DETAILS */}
                    {/* ============================= */}

                    <div className="review-section">
                      <div className="review-section-header">
                        <h4>Customer and Bank Details</h4>

                        <button
                          type="button"
                          className="review-edit-btn"
                          onClick={() => handleEditStep(2)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="review-grid">
                        <div className="review-item">
                          <span>Account Holder</span>

                          <strong>{getValues("accountHolderName")}</strong>
                        </div>

                        <div className="review-item">
                          <span>Customer Company</span>

                          <strong>{getValues("customerCompanyName")}</strong>
                        </div>

                        <div className="review-item">
                          <span>Bank Name</span>

                          <strong>{getValues("customerBankName")}</strong>
                        </div>

                        <div className="review-item">
                          <span>Bank Branch</span>

                          <strong>{getValues("customerBankBranchname")}</strong>
                        </div>

                        <div className="review-item">
                          <span>Account Number</span>

                          <strong>{getValues("customerAccountNumber")}</strong>
                        </div>

                        <div className="review-item">
                          <span>IFSC Code</span>

                          <strong>{getValues("customerBankIFSC")}</strong>
                        </div>
                      </div>
                    </div>

                    {/* ============================= */}
                    {/* INVOICE AND STATUS */}
                    {/* ============================= */}

                    <div className="review-section">
                      <div className="review-section-header">
                        <h4>Invoice and Status</h4>

                        <button
                          type="button"
                          className="review-edit-btn"
                          onClick={() => handleEditStep(3)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="review-grid">
                        <div className="review-item">
                          <span>Invoice Number</span>

                          <strong>{getValues("invoiceNo")}</strong>
                        </div>

                        <div className="review-item">
                          <span>Cheque Status</span>

                          <strong>{getValues("status")}</strong>
                        </div>
                      </div>
                    </div>

                    {/* ============================= */}
                    {/* PROCESSING DATES */}
                    {/* ============================= */}

                    <div className="review-section">
                      <div className="review-section-header">
                        <h4>Processing Dates</h4>

                        <button
                          type="button"
                          className="review-edit-btn"
                          onClick={() => handleEditStep(4)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="review-grid">
                        <div className="review-item">
                          <span>Submitted Date</span>

                          <strong>
                            {getValues("chequeSubmittedDate") || "Not provided"}
                          </strong>
                        </div>

                        <div className="review-item">
                          <span>Clearance Date</span>

                          <strong>
                            {getValues("chequeClearanceDate") || "Not provided"}
                          </strong>
                        </div>

                        <div className="review-item">
                          <span>Returned Date</span>

                          <strong>
                            {getValues("chequeReturnedDate") || "Not provided"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* ============================= */}
                    {/* CHEQUE IMAGE */}
                    {/* ============================= */}

                    <div className="review-section">
                      <div className="review-section-header">
                        <h4>Cheque Image</h4>

                        <button
                          type="button"
                          className="review-edit-btn"
                          onClick={() => handleEditStep(5)}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="review-file">
                        {getValues("cheque")?.[0] ? (
                          <>
                            <strong>{getValues("cheque")[0].name}</strong>

                            <span>{getValues("cheque")[0].type}</span>
                          </>
                        ) : (
                          <span>No image selected</span>
                        )}
                      </div>
                    </div>

                    {/* ============================= */}
                    {/* API ERROR */}
                    {/* ============================= */}

                    {submitError && (
                      <div className="submit-error">{submitError}</div>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* ============================= */}
            {/* MODAL FOOTER */}
            {/* ============================= */}

            <div className="add-cheque-modal-footer">
              {/* Left button */}

              {currentStep === 1 ? (
                <button
                  type="button"
                  className="add-cheque-cancel-btn"
                  onClick={onClose}
                >
                  Cancel
                </button>
              ) : (
                <button
                  type="button"
                  className="add-cheque-cancel-btn"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}

              {/* Right button */}

              {currentStep === 6 ? (
                <button
                  type="button"
                  className="add-cheque-submit-btn"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Cheque"}
                </button>
              ) : (
                <button
                  type="button"
                  className="add-cheque-next-btn"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addchequemodal;
