import "./Header.css";
import { FaMoneyCheckAlt } from "react-icons/fa";

function Header({ onAddCheque }) {
  return (
    <header className="header">
      <div className="header__icon">
        <FaMoneyCheckAlt />
      </div>

      <div className="header__content">
        <h1>Cheque Tracking System</h1>

        <p>
          Efficiently track, monitor and manage customer cheque payments from
          receipt to clearance.
        </p>
        <button type="button" className="add-cheque-btn" onClick={onAddCheque}>
          + Add Cheque
        </button>
      </div>
    </header>
  );
}

export default Header;
