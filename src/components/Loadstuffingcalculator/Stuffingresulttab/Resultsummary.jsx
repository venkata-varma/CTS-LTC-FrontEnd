import { containerTypes } from "../../../data/loadstuffingcalculator/containerTypes";
import { truckTypes } from "../../../data/loadstuffingcalculator/truckTypes";
function Resultsummary({ calculationResult, vehicleRequirement }) {
  if (!calculationResult || !vehicleRequirement) {
    return null;
  }

  const { totalPackages, totalCargoVolume, totalCargoWeight } =
    calculationResult;

  const {
    vehicleName,
    vehicleType,
    requiredVehicleCount,
    vehicleCapacity,
    vehicleMaxWeight,
  } = vehicleRequirement;

  // ==========================================
  // Get Vehicle Image
  // ==========================================

  const vehicleData =
    vehicleType === "container"
      ? containerTypes.find((container) => container.name === vehicleName)
      : truckTypes.find((truck) => truck.name === vehicleName);

  return (
    <div className="result-summary-wrapper">
      {/* =====================================
          OVERALL CARGO SUMMARY
      ====================================== */}

      <div className="overall-cargo-summary">
        <h3>Overall Cargo Summary</h3>

        <div className="result-summary-stats">
          <div className="result-summary-stat">
            <span>Total Packages</span>
            <strong>{totalPackages}</strong>
          </div>

          <div className="result-summary-stat">
            <span>Total Cargo Volume</span>
            <strong>{Number(totalCargoVolume).toFixed(2)} m³</strong>
          </div>

          <div className="result-summary-stat">
            <span>Total Cargo Weight</span>
            <strong>{Number(totalCargoWeight).toLocaleString()} kg</strong>
          </div>
        </div>
      </div>

      {/* =====================================
          VEHICLE USED
      ====================================== */}

      <div className="vehicle-used-section">
        <h3>Vehicle Used</h3>

        <div className="vehicle-used-card">
          <div className="vehicle-used-info">
            <div className="result-vehicle-type">{vehicleType}</div>

            <h4>{vehicleName}</h4>

            <div className="result-vehicle-image">
              {vehicleData?.image ? (
                <img src={vehicleData.image} alt={vehicleName} />
              ) : (
                <span>Image unavailable</span>
              )}
            </div>

            <div className="result-vehicle-count">
              {requiredVehicleCount}{" "}
              {requiredVehicleCount === 1 ? "unit" : "units"}
            </div>
          </div>

          <div className="vehicle-capacity-info">
            <div className="vehicle-capacity-item">
              <span>Vehicle Capacity</span>

              <strong>{vehicleCapacity} m³</strong>
            </div>

            <div className="vehicle-capacity-item">
              <span>Max Weight / Vehicle</span>

              <strong>{Number(vehicleMaxWeight).toLocaleString()} kg</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resultsummary;
