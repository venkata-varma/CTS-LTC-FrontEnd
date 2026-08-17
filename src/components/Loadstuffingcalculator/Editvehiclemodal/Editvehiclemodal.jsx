import "./Editvehiclemodal.css";
import { useEffect, useState } from "react";
import { containerTypes } from "../../../data/loadstuffingcalculator/containerTypes";
import { truckTypes } from "../../../data/loadstuffingcalculator/truckTypes";
import { useDispatch, useSelector } from "react-redux";

import {
  updateVehicle,
  getAllVehiclesOfSession,
} from "../../../redux/features/vehicle/vehicleSlice";

function Editvehiclemodal({ isOpen, onClose, vehicle }) {
  // Edit Vehicle Form

  const [vehicleForm, setVehicleForm] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();

  const currentSession = useSelector(
    (state) => state.calculationSession.currentSession,
  );
  // ==========================================
  // Populate Form
  // ==========================================
  useEffect(() => {
    if (!vehicle || !isOpen) {
      return;
    }

    setVehicleForm(structuredClone(vehicle));
  }, [vehicle, isOpen]);
  const handleClose = () => {
    if (vehicle) {
      setVehicleForm(structuredClone(vehicle));
    }

    onClose();
  };

  // ==========================================
  // Update Vehicle
  // ==========================================

  const handleUpdateVehicle = async () => {
    // ==========================================
    // Validation
    // ==========================================

    const errors = {};

    // Validate Specifications
    vehicleForm.vehicleConfiguration.specifications.forEach((specification) => {
      const value = getSpecificationNumber(specification.value);

      if (!value.trim()) {
        errors[specification.label] = "Required";
      }
    });

    // Validate Vehicle Count
    if (!vehicleForm.vehicleCount || vehicleForm.vehicleCount < 1) {
      errors.vehicleCount = "Cannot be equal to 0";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);

      return;
    }

    setValidationErrors({});

    const payload = {
      vehicleType: vehicleForm.vehicleType,

      vehicleName: vehicleForm.vehicleName,

      vehicleConfiguration: vehicleForm.vehicleConfiguration,

      axleLoadSettings: vehicleForm.axleLoadSettings || {},

      vehicleCount: vehicleForm.vehicleCount,

      isCustomVehicle: vehicleForm.isCustomVehicle,
    };

    try {
      await dispatch(
        updateVehicle({
          vehicleId: vehicle._id,

          payload,
        }),
      ).unwrap();

      await dispatch(getAllVehiclesOfSession(currentSession._id));

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  if (!isOpen) {
    return null;
  }
  // ==========================================
  // Vehicle Types
  // ==========================================

  const availableVehicleTypes =
    vehicleForm?.vehicleType === "container" ? containerTypes : truckTypes;
  // ==========================================
  // Selected Vehicle Type Details
  // ==========================================

  const selectedVehicleType = availableVehicleTypes.find(
    (item) => item.name === vehicleForm?.vehicleName,
  );

  // ==========================================
  // Specification Value Helpers
  // ==========================================

  // ==========================================
  // Specification Helpers
  // ==========================================

  const getSpecificationUnit = (label) => {
    switch (label) {
      case "Inside Length":
      case "Inside Width":
      case "Inside Height":
      case "Door Width":
      case "Door Height":
        return "m";

      case "Capacity":
        return "m³";

      case "Tare Weight":
      case "Max Weight":
        return "kg";

      default:
        return "";
    }
  };

  const getSpecificationNumber = (value = "") => {
    const unitRegex = /\s?(m³|m3|kg|mm|m)$/i;

    return String(value).replace(unitRegex, "").trim();
  };

  const buildSpecificationValue = (number, label) => {
    const unit = getSpecificationUnit(label);

    return number.trim() ? `${number.trim()} ${unit}` : "";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Vehicle</h2>
        <div className="edit-vehicle-image">
          <img
            src={selectedVehicleType?.image}
            alt={vehicleForm?.vehicleName}
          />
        </div>

        {/* ==========================================
    Vehicle Type
========================================== */}

        <div className="edit-vehicle-field">
          <label>Vehicle Type</label>

          <select
            value={vehicleForm?.vehicleName || ""}
            onChange={(event) => {
              const selectedType = availableVehicleTypes.find(
                (item) => item.name === event.target.value,
              );

              setVehicleForm((previous) => ({
                ...previous,

                vehicleName: selectedType.name,

                vehicleConfiguration: {
                  specifications: selectedType.specifications,
                },

                axleLoadSettings: selectedType.axleLoadSettings || {},

                isCustomVehicle: selectedType.isCustom,
              }));
            }}
          >
            {availableVehicleTypes.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* ==========================================
    Vehicle Image
========================================== */}

        {/* ==========================================
    Specifications
========================================== */}

        <div className="edit-specifications">
          {vehicleForm?.vehicleConfiguration?.specifications?.map(
            (specification, index) => (
              <div className="edit-specification" key={specification.label}>
                <label>
                  {specification.label}

                  <span className="required-star">*</span>
                </label>

                <div className="specification-input-with-unit">
                  <input
                    type="text"
                    value={getSpecificationNumber(specification.value)}
                    disabled={!vehicleForm?.isCustomVehicle}
                    onChange={(event) => {
                      const updatedSpecifications = [
                        ...vehicleForm.vehicleConfiguration.specifications,
                      ];

                      updatedSpecifications[index] = {
                        ...updatedSpecifications[index],

                        value: buildSpecificationValue(
                          event.target.value,
                          specification.label,
                        ),
                      };

                      setVehicleForm((previous) => ({
                        ...previous,

                        vehicleConfiguration: {
                          ...previous.vehicleConfiguration,

                          specifications: updatedSpecifications,
                        },
                      }));
                    }}
                  />

                  <span className="specification-unit">
                    {getSpecificationUnit(specification.label)}
                  </span>
                </div>
                {validationErrors[specification.label] && (
                  <span className="field-error">
                    {validationErrors[specification.label]}
                  </span>
                )}
              </div>
            ),
          )}
        </div>

        {/* ==========================================
    Truck Axle Load Settings
========================================== */}

        {vehicleForm?.vehicleType === "truck" && (
          <div className="edit-axle-section">
            <h3>Axle Load Settings</h3>

            <div className="edit-axle-grid">
              {/* Front Axle */}
              <div className="edit-axle-group">
                <h4>Front Axle</h4>

                <div className="edit-axle-field">
                  <label>
                    Max Weight
                    <span className="required-star">*</span>
                  </label>

                  <div className="axle-input-with-unit">
                    <input
                      type="number"
                      value={
                        vehicleForm?.axleLoadSettings?.front?.maxWeight
                          ?.value ?? ""
                      }
                      onChange={(event) =>
                        setVehicleForm((previous) => ({
                          ...previous,

                          axleLoadSettings: {
                            ...previous.axleLoadSettings,

                            front: {
                              ...previous.axleLoadSettings.front,

                              maxWeight: {
                                ...previous.axleLoadSettings.front.maxWeight,

                                value: Number(event.target.value),
                              },
                            },
                          },
                        }))
                      }
                    />

                    <span>
                      {vehicleForm?.axleLoadSettings?.front?.maxWeight?.unit ||
                        "kg"}
                    </span>
                  </div>
                </div>

                <div className="edit-axle-field">
                  <label>
                    Offset
                    <span className="required-star">*</span>
                  </label>

                  <div className="axle-input-with-unit">
                    <input
                      type="number"
                      value={
                        vehicleForm?.axleLoadSettings?.front?.offset?.value ??
                        ""
                      }
                      onChange={(event) =>
                        setVehicleForm((previous) => ({
                          ...previous,

                          axleLoadSettings: {
                            ...previous.axleLoadSettings,

                            front: {
                              ...previous.axleLoadSettings.front,

                              offset: {
                                ...previous.axleLoadSettings.front.offset,

                                value: Number(event.target.value),
                              },
                            },
                          },
                        }))
                      }
                    />

                    <span>
                      {vehicleForm?.axleLoadSettings?.front?.offset?.unit ||
                        "mm"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rear Axle */}
              <div className="edit-axle-group">
                <h4>Rear Axle</h4>

                <div className="edit-axle-field">
                  <label>
                    Max Weight
                    <span className="required-star">*</span>
                  </label>

                  <div className="axle-input-with-unit">
                    <input
                      type="number"
                      value={
                        vehicleForm?.axleLoadSettings?.rear?.maxWeight?.value ??
                        ""
                      }
                      onChange={(event) =>
                        setVehicleForm((previous) => ({
                          ...previous,

                          axleLoadSettings: {
                            ...previous.axleLoadSettings,

                            rear: {
                              ...previous.axleLoadSettings.rear,

                              maxWeight: {
                                ...previous.axleLoadSettings.rear.maxWeight,

                                value: Number(event.target.value),
                              },
                            },
                          },
                        }))
                      }
                    />

                    <span>
                      {vehicleForm?.axleLoadSettings?.rear?.maxWeight?.unit ||
                        "kg"}
                    </span>
                  </div>
                </div>

                <div className="edit-axle-field">
                  <label>
                    Offset
                    <span className="required-star">*</span>
                  </label>

                  <div className="axle-input-with-unit">
                    <input
                      type="number"
                      value={
                        vehicleForm?.axleLoadSettings?.rear?.offset?.value ?? ""
                      }
                      onChange={(event) =>
                        setVehicleForm((previous) => ({
                          ...previous,

                          axleLoadSettings: {
                            ...previous.axleLoadSettings,

                            rear: {
                              ...previous.axleLoadSettings.rear,

                              offset: {
                                ...previous.axleLoadSettings.rear.offset,

                                value: Number(event.target.value),
                              },
                            },
                          },
                        }))
                      }
                    />

                    <span>
                      {vehicleForm?.axleLoadSettings?.rear?.offset?.unit ||
                        "mm"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
    Vehicle Count
========================================== */}

        <div className="edit-vehicle-count">
          <label>
            Vehicle Count
            <span className="required-star">*</span>
          </label>

          <input
            type="number"
            min="1"
            value={vehicleForm?.vehicleCount ?? 1}
            onChange={(event) =>
              setVehicleForm((previous) => ({
                ...previous,

                vehicleCount: Number(event.target.value),
              }))
            }
          />
          {validationErrors.vehicleCount && (
            <span className="field-error">{validationErrors.vehicleCount}</span>
          )}
        </div>
        <div className="edit-vehicle-actions">
          <button
            type="button"
            className="edit-vehicle-close-btn"
            onClick={handleClose}
          >
            Close
          </button>

          <button
            type="button"
            className="edit-vehicle-update-btn"
            onClick={handleUpdateVehicle}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Editvehiclemodal;
