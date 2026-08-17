import "./Vehiclecard.css";
import { containerTypes } from "../../../data/loadstuffingcalculator/containerTypes";

import { truckTypes } from "../../../data/loadstuffingcalculator/truckTypes";
function Vehiclecard({ vehicle, onEdit, onDelete }) {
  // ==========================================
  // Get Vehicle Image Data
  // ==========================================
  const vehicleData =
    vehicle.vehicleType === "container"
      ? containerTypes.find(
          (container) => container.name === vehicle.vehicleName,
        )
      : truckTypes.find((truck) => truck.name === vehicle.vehicleName);

  // Show only important specifications on the card
  const importantSpecifications =
    vehicle.vehicleConfiguration.specifications.filter((specification) =>
      [
        "Inside Length",
        "Inside Width",
        "Inside Height",
        "Capacity",
        "Max Weight",
      ].includes(specification.label),
    );

  return (
    <div className="vehicle-card">
      {/* ==========================================
          Vehicle Card Header
      ========================================== */}
      <div className="vehicle-card-header">
        <div className="vehicle-card-title">
          <h3>{vehicle.vehicleName}</h3>

          <span className="vehicle-type-badge">{vehicle.vehicleType}</span>
        </div>
        <div className="vehicle-card-actions">
          <button
            type="button"
            className="edit-button"
            title="Edit Vehicle"
            onClick={() => onEdit(vehicle)}
          >
            ✏️
          </button>

          <button
            type="button"
            className="delete-button"
            title="Delete Vehicle"
            onClick={() => onDelete(vehicle)}
          >
            🗑️
          </button>
        </div>
      </div>
      {/* ==========================================
          Vehicle Card Body
      ========================================== */}

      <div className="vehicle-card-body">
        {/* Vehicle Image */}
        <div className="vehicle-image">
          <img src={vehicleData?.image} alt={vehicle.vehicleName} />
        </div>
        {/* Important Specifications */}
        <div className="vehicle-specifications">
          {importantSpecifications.map((specification) => (
            <div className="vehicle-specification" key={specification.label}>
              <span>{specification.label}</span>

              <strong>{specification.value}</strong>
            </div>
          ))}
        </div>

        {/* ==========================================
    Truck Axle Load
========================================== */}

        {vehicle.vehicleType === "truck" && (
          <div className="vehicle-axle-load">
            <div className="axle-load-title">Axle Load</div>

            <div className="axle-load-grid">
              <div className="axle-load-item">
                <span>F</span>

                <strong>
                  {vehicle.axleLoadSettings?.front?.maxWeight?.value}
                </strong>

                <small>
                  {vehicle.axleLoadSettings?.front?.maxWeight?.unit}
                </small>
              </div>

              <div className="axle-load-item">
                <span>R</span>

                <strong>
                  {vehicle.axleLoadSettings?.rear?.maxWeight?.value}
                </strong>

                <small>{vehicle.axleLoadSettings?.rear?.maxWeight?.unit}</small>
              </div>

              <div className="axle-load-item">
                <span>F</span>

                <strong>
                  {vehicle.axleLoadSettings?.front?.offset?.value}
                </strong>

                <small>{vehicle.axleLoadSettings?.front?.offset?.unit}</small>
              </div>

              <div className="axle-load-item">
                <span>R</span>

                <strong>{vehicle.axleLoadSettings?.rear?.offset?.value}</strong>

                <small>{vehicle.axleLoadSettings?.rear?.offset?.unit}</small>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Footer & Count */}
        <div className="vehicle-card-footer">
          <div className="vehicle-count">
            <span>Count</span>

            <strong>{vehicle.vehicleCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehiclecard;
