import { FiPackage, FiTruck, FiGrid } from "react-icons/fi";
import "./Tabs.css";

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-wrapper">
      <div className="tabs-container">
        <button
          className={`tab-button ${
            activeTab === "products" ? "active" : ""
          }`}
          onClick={() => setActiveTab("products")}
        >
          <FiPackage />
          <span>PRODUCTS</span>
        </button>

        <div className="tab-divider" />

        <button
          className={`tab-button ${
            activeTab === "containers" ? "active" : ""
          }`}
          onClick={() => setActiveTab("containers")}
        >
          <FiTruck />
          <span>CONTAINERS & TRUCKS</span>
        </button>

        <div className="tab-divider" />

        <button
          className={`tab-button ${
            activeTab === "result" ? "active" : ""
          }`}
          onClick={() => setActiveTab("result")}
        >
          <FiGrid />
          <span>STUFFING RESULT</span>
        </button>
      </div>
    </div>
  );
}

export default Tabs;