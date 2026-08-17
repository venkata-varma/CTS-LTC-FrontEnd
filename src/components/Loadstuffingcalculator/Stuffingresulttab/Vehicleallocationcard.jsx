import { containerTypes } from "../../../data/loadstuffingcalculator/containerTypes";
import { truckTypes } from "../../../data/loadstuffingcalculator/truckTypes";

function Vehicleallocationcard({ vehicle, vehicleName,vehicleType }) {
  const vehicleData =
    vehicleType === "container"
      ? containerTypes.find((container) => container.name === vehicleName)
      : truckTypes.find((truck) => truck.name === vehicleName);
  return (
    <div className="vehicle-allocation-card">
      {/* LEFT SIDE */}
      <div className="vehicle-allocation-left">
        <h3>
          {vehicleName} #{vehicle.vehicleNumber}
        </h3>
        <div className="vehicle-layout-image">
          {vehicleData?.image ? (
            <img src={vehicleData.image} alt={vehicleName} />
          ) : (
            <span>Image unavailable</span>
          )}
        </div>
        <span className="vehicle-unit-text">1 unit</span>

        <button
          className="view-3d-btn"
          disabled
          title="3D arrangement will be added in a later version"
        >
          3D View
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="vehicle-allocation-right">
        <div className="vehicle-result-totals">
          <div>
            <span>Total</span>
            <strong>{vehicle.totalPackages} packages</strong>
          </div>

          <div>
            <span>Cargo Volume</span>
            <strong>{Number(vehicle.cargoVolume).toFixed(2)} m³</strong>

            <small>
              {Number(vehicle.volumeUtilization).toFixed(1)}% of volume
            </small>
          </div>

          <div>
            <span>Cargo Weight</span>
            <strong>{Number(vehicle.cargoWeight).toLocaleString()} kg</strong>

            <small>
              {Number(vehicle.weightUtilization).toFixed(1)}% of max weight
            </small>
          </div>
        </div>

        {/* PRODUCT BREAKDOWN */}

        <div className="vehicle-product-table">
          <div className="vehicle-product-header">
            <span>Product</span>
            <span>Packages</span>
            <span>Volume</span>
            <span>Weight</span>
          </div>

          {vehicle.products.map((product) => (
            <div className="vehicle-product-row" key={product.productId}>
              <span className="vehicle-product-name">
                {product.productName}
              </span>

              <span>{product.quantity}</span>

              <span>{Number(product.volume).toFixed(2)} m³</span>

              <span>{Number(product.weight).toLocaleString()} kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vehicleallocationcard;
