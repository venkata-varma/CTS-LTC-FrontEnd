import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiCopy,
  FiCreditCard,
} from "react-icons/fi";
const icons = {
  total: <FiCreditCard />,
  submitted: <FiFileText />,
  pending: <FiClock />,
  cleared: <FiCheckCircle />,
  bounced: <FiAlertCircle />,
  multiple: <FiCopy />,
};

function Analyticscard({ title, value, type }) {
  return (
    <div className={`analytics-card ${type}`}>
      <div className="analytics-card-top">
        <div className="analytics-icon">
          {icons[type]}
        </div>

        <span className="analytics-title">
          {title}
        </span>
      </div>

      <h2>{value}</h2>
    </div>
  );
}

export default Analyticscard;