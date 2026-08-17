import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./Commonmodal.css";

function Commonmodal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="commonmodal-backdrop"
      // onMouseDown={handleBackdropClick}
    >
      <div
        className={`commonmodal-container commonmodal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="commonmodal-title"
      >
        <div className="commonmodal-header">
          <h2 id="commonmodal-title">{title}</h2>

          <button
            type="button"
            className="commonmodal-close-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>

        <div className="commonmodal-content">{children}</div>
      </div>
    </div>
  );
}

export default Commonmodal;