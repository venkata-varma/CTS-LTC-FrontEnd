import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiFileText } from "react-icons/fi";
import { toast } from "react-toastify";

import { addChequeNote } from "../../../redux/features/chequeTracking/chequeTrackingSlice";

import "./Addnotemodal.css";

function Addnotemodal({ cheque, onClose }) {
  const dispatch = useDispatch();

  const { noteLoading } = useSelector(
    (state) => state.chequeTracking
  );

  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");

  // ========================================
  // HANDLE NOTE CHANGE
  // ========================================

  const handleNoteChange = (e) => {
    setNote(e.target.value);

    if (formError) {
      setFormError("");
    }
  };

  // ========================================
  // SUBMIT NOTE
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedNote = note.trim();

    if (!normalizedNote) {
      setFormError("Please enter a note.");
      return;
    }

    if (normalizedNote.length > 1000) {
      setFormError(
        "Note cannot exceed 1000 characters."
      );
      return;
    }

    const noteData = {
      note: normalizedNote,
    };

    try {
      const response = await dispatch(
        addChequeNote({
          chequeId: cheque._id,
          noteData,
        })
      ).unwrap();

      toast.success(
        response.message || "Note added successfully."
      );

      onClose();
    } catch (error) {
      setFormError(
        error || "Failed to add cheque note."
      );
    }
  };

  return (
    <div
      className="add-note-overlay"
      onClick={noteLoading ? undefined : onClose}
    >
      <div
        className="add-note-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="add-note-header">
          <div>
            <h2>Add Note</h2>

            <p>
              Add an internal note related to this cheque.
            </p>
          </div>

          <button
            type="button"
            className="add-note-close"
            onClick={onClose}
            disabled={noteLoading}
          >
            <FiX />
          </button>
        </div>

        {/* CHEQUE SUMMARY */}

        <div className="add-note-cheque-summary">
          <div>
            <span>Cheque No</span>
            <strong>{cheque?.chequeNo || "—"}</strong>
          </div>

          <div>
            <span>Current Status</span>
            <strong>{cheque?.status || "—"}</strong>
          </div>

          <div>
            <span>Present Place</span>
            <strong>{cheque?.presentPlace || "—"}</strong>
          </div>
        </div>

        {/* FORM */}

        <form
          className="add-note-form"
          onSubmit={handleSubmit}
        >
          <div className="add-note-form-group">
            <label htmlFor="cheque-note">
              Note <span>*</span>
            </label>

            <div className="add-note-textarea-wrapper">
              <FiFileText />

              <textarea
                id="cheque-note"
                value={note}
                onChange={handleNoteChange}
                placeholder="Enter note about this cheque..."
                rows="5"
                maxLength={1000}
                disabled={noteLoading}
                autoFocus
              />
            </div>

            <div className="add-note-character-count">
              {note.length} / 1000
            </div>
          </div>

          {formError && (
            <div className="add-note-error">
              {formError}
            </div>
          )}

          {/* ACTIONS */}

          <div className="add-note-actions">
            <button
              type="button"
              className="add-note-cancel-btn"
              onClick={onClose}
              disabled={noteLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-note-submit-btn"
              disabled={noteLoading}
            >
              {noteLoading ? "Adding..." : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addnotemodal;