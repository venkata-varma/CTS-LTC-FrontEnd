import { truckTypes } from "../../../../data/loadstuffingcalculator/truckTypes";

import "./Step1trucktype.css";

function Step1trucktype({
  selectedTruck,
  setSelectedTruck,
  selectedInfoTruck,
  setSelectedInfoTruck,
  onSelectTruck,
}) {
  return (
    <>
      <h3>Select Truck Type</h3>

      <div className="truck-grid">
        {truckTypes.map((truck) => (
          <div
            key={truck.id}
            className={`truck-card ${
              selectedTruck?.id === truck.id ? "selected" : ""
            }`}
            onClick={() => setSelectedTruck(truck)}
          >
            <img src={truck.image} alt={truck.name} />

            <h4>{truck.name}</h4>

            <button
              className="learn-more-link"
              type="button"
              onClick={(event) => {
                event.stopPropagation();

                setSelectedInfoTruck(truck);
              }}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>

      <div className="truck-select-actions">
        <button
          type="button"
          className="truck-select-button"
          disabled={!selectedTruck}
          onClick={onSelectTruck}
        >
          Select
        </button>
      </div>
    </>
  );
}

export default Step1trucktype;
