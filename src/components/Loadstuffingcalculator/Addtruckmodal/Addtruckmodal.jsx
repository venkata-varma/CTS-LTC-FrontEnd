import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createVehicle,
  getAllVehiclesOfSession,
} from "../../../redux/features/vehicle/vehicleSlice";
import Commonmodal from "../Commonmodal/Commonmodal";

import Step1trucktype from "./Truckwizardsteps/Step1trucktype";

import "./Addtruckmodal.css";

import { truckTypes } from "../../../data/loadstuffingcalculator/truckTypes";

function Addtruckmodal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const currentSession = useSelector(
    (state) => state.calculationSession.currentSession,
  );
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [selectedInfoTruck, setSelectedInfoTruck] = useState(null);

const handleSelectTruck = async () => {
  if (!selectedTruck || !currentSession?._id) {
    return;
  }

  const payload = {
    vehicleType: "truck",

    vehicleName: selectedTruck.name,

    calculationSessionId: currentSession._id,

    vehicleConfiguration: {
      specifications: selectedTruck.specifications,
    },

    axleLoadSettings: selectedTruck.axleLoadSettings || {},

    isCustomVehicle: selectedTruck.isCustom,

    vehicleCount: 1,
  };

  try {
    await dispatch(createVehicle(payload)).unwrap();

    await dispatch(
      getAllVehiclesOfSession(currentSession._id),
    ).unwrap();

    setSelectedTruck(null);

    onClose();
  } catch (error) {
    console.error("Failed to create truck:", error);
  }
};

  return (
    <Commonmodal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Truck"
      size="large"
    >
      <div className="addtruck-body">
        {!selectedInfoTruck && (
          <Step1trucktype
            selectedTruck={selectedTruck}
            setSelectedTruck={setSelectedTruck}
            selectedInfoTruck={selectedInfoTruck}
            setSelectedInfoTruck={setSelectedInfoTruck}
              onSelectTruck={handleSelectTruck}
          />
        )}

        {selectedInfoTruck && (
          <div className="truck-details-view">
            <button
              type="button"
              className="back-button"
              onClick={() => setSelectedInfoTruck(null)}
            >
              ← Back
            </button>

            <div className="truck-details-layout">
              <aside className="truck-details-sidebar">
                {truckTypes.map((truck) => (
                  <button
                    key={truck.id}
                    type="button"
                    className={`truck-details-nav-button ${
                      selectedInfoTruck.id === truck.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedInfoTruck(truck)}
                  >
                    {truck.name}
                  </button>
                ))}
              </aside>

              <div className="truck-details-main">
                <div className="details-layout">
                  <div className="details-image">
                    <img
                      src={selectedInfoTruck.image}
                      alt={selectedInfoTruck.name}
                    />
                  </div>
                  <div className="details-content">
                    <h2 className="truck-name-styling">
                      {selectedInfoTruck.name}
                    </h2>

                    <div className="truck-specifications">
                      <h3>Specifications</h3>

                      <div className="specifications-grid">
                        {selectedInfoTruck.specifications.map((item) => (
                          <div key={item.label} className="specification-row">
                            <span className="specification-label">
                              {item.label}
                            </span>

                            <span className="specification-value">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="truck-description">
                      <h3>Description</h3>

                      {selectedInfoTruck.description.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Commonmodal>
  );
}

export default Addtruckmodal;
