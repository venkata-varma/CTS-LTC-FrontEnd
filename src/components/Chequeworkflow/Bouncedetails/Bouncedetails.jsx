import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  FiEdit2,
  FiEye,
  FiRefreshCcw,
  FiFileText,
  FiRotateCcw,
  FiMessageSquare,
  FiCheck,
  FiX,
} from "react-icons/fi";

import { updatePresentPlace } from "../../../redux/features/chequeTracking/chequeTrackingSlice";
import Recordbouncemodal from "./Recordbouncemodal.jsx";
import Returnedchequereceiptmodal from "./Returnedchequereceiptmodal.jsx";
import Recordredepositmodal from "./Recordredepositmodal.jsx";
import Addnotemodal from "./Addnotemodal.jsx";
import Noteshistorymodal from "./Noteshistorymodal";
import Bounceredepositsummarymodal from "./Bounceredepositsummarymodal.jsx";
import "./Bouncedetails.css";

const Bouncedetails = () => {
  const dispatch = useDispatch();

  const { individualCheque, presentPlaceLoading, workflowActivities } =
    useSelector((state) => state.chequeTracking);

  const currentPresentPlace = individualCheque?.presentPlace || "Office";
  const bounceCount = workflowActivities.filter(
    (activity) => activity.activityType === "cheque-bounced",
  ).length;

  const noteActivities = workflowActivities.filter(
    (activity) => activity.activityType === "note-added",
  );

  const noteCount = noteActivities.length;
  const [isEditingPresentPlace, setIsEditingPresentPlace] = useState(false);

  const [presentPlaceValue, setPresentPlaceValue] = useState("");
  const [showBounceModal, setShowBounceModal] = useState(false);
  const [showReturnedReceiptModal, setShowReturnedReceiptModal] =
    useState(false);
  const [showRedepositModal, setShowRedepositModal] = useState(false);
  const [presentPlaceError, setPresentPlaceError] = useState("");
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showNotesHistoryModal, setShowNotesHistoryModal] = useState(false);
  const [showBounceSummaryModal, setShowBounceSummaryModal] = useState(false);

  const handleEditPresentPlace = () => {
    setPresentPlaceValue(currentPresentPlace);
    setPresentPlaceError("");
    setIsEditingPresentPlace(true);
  };

  const handleCancelPresentPlace = () => {
    setPresentPlaceValue("");
    setPresentPlaceError("");
    setIsEditingPresentPlace(false);
  };

  const handleSavePresentPlace = async () => {
    const trimmedPlace = presentPlaceValue.trim();

    if (!trimmedPlace) {
      setPresentPlaceError("Please enter the present place.");
      return;
    }

    try {
      const response = await dispatch(
        updatePresentPlace({
          chequeId: individualCheque._id,

          presentPlaceData: {
            presentPlace: trimmedPlace,
          },
        }),
      ).unwrap();

      toast.success(
        response.message || "Cheque present place updated successfully.",
      );

      setPresentPlaceError("");
      setIsEditingPresentPlace(false);
    } catch (error) {
      setPresentPlaceError(error || "Failed to update cheque present place.");
    }
  };

  return (
    <>
      <div className="bounce-details-card">
        <h3 className="bounce-details-title">Bounce / Return details</h3>

        {/* Current bounce information */}
        <div className="bounce-overview">
          <div className="bounce-overview-item">
            <span className="bounce-overview-label">Bounces</span>

            <div className="bounce-count-row">
              <strong className="bounce-count"> {bounceCount} of 3</strong>
            </div>

            <span className="bounce-limit-text">Maximum 3 bounce attempts</span>
          </div>

          <div className="bounce-overview-divider" />

          <div className="bounce-overview-item">
            <span className="bounce-overview-label">Present Place</span>

            {!isEditingPresentPlace ? (
              <div className="present-place-row">
                <strong
                  className="present-place-value"
                  title={currentPresentPlace}
                >
                  {currentPresentPlace}
                </strong>

                <button
                  type="button"
                  className="present-place-edit"
                  title="Update present place"
                  onClick={handleEditPresentPlace}
                >
                  <FiEdit2 />
                </button>
              </div>
            ) : (
              <div className="present-place-edit-mode">
                <input
                  type="text"
                  className="present-place-input"
                  value={presentPlaceValue}
                  onChange={(event) => {
                    setPresentPlaceValue(event.target.value);

                    if (presentPlaceError) {
                      setPresentPlaceError("");
                    }
                  }}
                  placeholder="Enter present place"
                  disabled={presentPlaceLoading}
                  autoFocus
                />

                <div className="present-place-edit-actions">
                  <button
                    type="button"
                    className="present-place-save-btn"
                    onClick={handleSavePresentPlace}
                    disabled={presentPlaceLoading}
                    title="Save"
                  >
                    <FiCheck />
                  </button>

                  <button
                    type="button"
                    className="present-place-cancel-btn"
                    onClick={handleCancelPresentPlace}
                    disabled={presentPlaceLoading}
                    title="Cancel"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            )}

            {presentPlaceError && (
              <span className="present-place-error">{presentPlaceError}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        <button
          type="button"
          className="bounce-summary-button"
          onClick={() => setShowBounceSummaryModal(true)}
        >
          <FiEye />
          View Bounce &amp; Redeposit Summary
        </button>

        {/* Notes */}
        <div className="bounce-notes-row">
          <div className="bounce-notes-info">
            <FiMessageSquare />

            <div>
              <span className="bounce-notes-title">Notes</span>

              <span className="bounce-notes-count">
                {noteCount === 0
                  ? "No notes added"
                  : `${noteCount} ${noteCount === 1 ? "note" : "notes"} added`}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="bounce-view-notes-button"
            onClick={() => setShowNotesHistoryModal(true)}
            disabled={noteCount === 0}
          >
            View All Notes
          </button>
        </div>

        {/* Actions */}
        <div className="bounce-actions-section">
          <span className="bounce-actions-label">Actions</span>

          <div className="bounce-actions-grid">
            <button
              type="button"
              className="bounce-action-button"
              onClick={() => setShowBounceModal(true)}
            >
              <FiRefreshCcw />
              <span>Record Bounce</span>
            </button>

            <button
              type="button"
              className="bounce-action-button"
              onClick={() => setShowReturnedReceiptModal(true)}
            >
              <FiFileText />
              <span>Returned Cheque Receipt</span>
            </button>

            <button
              type="button"
              className="bounce-action-button"
              onClick={() => setShowRedepositModal(true)}
            >
              <FiRotateCcw />
              <span>Record Redeposit</span>
            </button>

            <button
              type="button"
              className="bounce-action-button"
              onClick={() => setShowAddNoteModal(true)}
            >
              <FiMessageSquare />
              <span>Add Note</span>
            </button>
          </div>
        </div>
      </div>

      {showBounceModal && individualCheque && (
        <Recordbouncemodal
          cheque={individualCheque}
          onClose={() => setShowBounceModal(false)}
        />
      )}

      {showReturnedReceiptModal && individualCheque && (
        <Returnedchequereceiptmodal
          cheque={individualCheque}
          onClose={() => setShowReturnedReceiptModal(false)}
        />
      )}
      {showRedepositModal && individualCheque && (
        <Recordredepositmodal
          cheque={individualCheque}
          onClose={() => setShowRedepositModal(false)}
        />
      )}

      {showAddNoteModal && individualCheque && (
        <Addnotemodal
          cheque={individualCheque}
          onClose={() => setShowAddNoteModal(false)}
        />
      )}

      {showNotesHistoryModal && (
        <Noteshistorymodal
          cheque={individualCheque}
          notes={noteActivities}
          onClose={() => setShowNotesHistoryModal(false)}
        />
      )}

      {showBounceSummaryModal &&
  individualCheque && (
    <Bounceredepositsummarymodal
      cheque={individualCheque}
      workflowActivities={
        workflowActivities
      }
      onClose={() =>
        setShowBounceSummaryModal(
          false
        )
      }
    />
  )}
    </>
  );
};

export default Bouncedetails;
