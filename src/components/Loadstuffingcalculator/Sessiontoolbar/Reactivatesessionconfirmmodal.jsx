import Commonmodal from "../Commonmodal/Commonmodal";

import "./Reactivatesessionconfirmmodal.css";

function Reactivatesessionconfirmmodal({
  isOpen,
  session,
  loading,
  onClose,
  onConfirm,
}) {
  if (!session) {
    return null;
  }

  return (
    <Commonmodal
      isOpen={isOpen}
      onClose={loading ? () => {} : onClose}
      title="Reactivate Session"
      size="small"
    >
      <div className="reactivate-confirmation">
        <p>
          Your present open session will be saved and
          changed to paused status.
        </p>

        <p>
          Do you want to reactivate{" "}
          <strong>{session.sessionTitle}</strong>?
        </p>

        <div className="reactivate-confirmation-actions">
          <button
            type="button"
            className="reactivate-cancel-button"
            onClick={onClose}
            disabled={loading}
          >
            No
          </button>

          <button
            type="button"
            className="reactivate-confirm-button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading
              ? "Reactivating..."
              : "Yes, Reactivate"}
          </button>
        </div>
      </div>
    </Commonmodal>
  );
}

export default Reactivatesessionconfirmmodal;