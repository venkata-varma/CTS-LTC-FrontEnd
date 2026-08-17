import { containerTypes } from "../../../../data/loadstuffingcalculator/containerTypes";

import "./Step1containertype.css";
function Step1containertype({
  selectedContainer,
  setSelectedContainer,
  selectedInfoContainer,
  setSelectedInfoContainer,
  onSelect,
}) {
  return (
    <>
      <h3>Select Container Type</h3>

      <div className="container-grid">
        {containerTypes.map((container) => (
          <div
            key={container.id}
            className={`container-card ${
              selectedContainer?.id === container.id ? "selected" : ""
            }`}
            onClick={() => setSelectedContainer(container)}
          >
            <img src={container.image} alt={container.name} />

            <h4>{container.name}</h4>
            <button
              className="learn-more-link"
              type="button"
              onClick={(event) => {
                event.stopPropagation();

                setSelectedInfoContainer(container);
              }}
            >
              Learn More
            </button>
          </div>
        ))}

      </div>
      
        <div className="container-selection-footer">
          <button
            type="button"
            className="primary-btn"
            disabled={!selectedContainer}
            onClick={onSelect}
          >
            Select
          </button>
        </div>
    </>
  );
}

export default Step1containertype;
