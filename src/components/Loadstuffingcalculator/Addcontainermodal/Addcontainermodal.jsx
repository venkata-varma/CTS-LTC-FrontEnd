import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createVehicle,
  getAllVehiclesOfSession,
} from "../../../redux/features/vehicle/vehicleSlice";
import Commonmodal from "../Commonmodal/Commonmodal";

import Step1containertype from "./Containerwizardsteps/Step1containertype";

import "./Addcontainermodal.css";
import { containerTypes } from "../../../data/loadstuffingcalculator/containerTypes";

function Addcontainermodal({ isOpen, onClose }) {
  const [selectedContainer, setSelectedContainer] = useState(null);

  const [selectedInfoContainer, setSelectedInfoContainer] = useState(null);
  const dispatch = useDispatch();

  const currentSession = useSelector(
    (state) => state.calculationSession.currentSession,
  );

  const handleCreateContainer = async () => {
    if (!selectedContainer || !currentSession?._id) {
      return;
    }

    const payload = {
      vehicleType: "container",

      vehicleName: selectedContainer.name,

      calculationSessionId: currentSession._id,

      vehicleConfiguration: {
        specifications: selectedContainer.specifications,
      },

      axleLoadSettings: {},

      isCustomVehicle: selectedContainer.isCustom,

      vehicleCount: 1,
    };

    const response = await dispatch(createVehicle(payload));

    if (createVehicle.fulfilled.match(response)) {
      dispatch(getAllVehiclesOfSession(currentSession._id));

      setSelectedContainer(null);

      setSelectedInfoContainer(null);

      onClose();
    }
  };

  return (
    <Commonmodal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Container"
      size="large"
    >
      <div className="addcontainer-body">
        {!selectedInfoContainer && (
          <Step1containertype
            selectedContainer={selectedContainer}
            setSelectedContainer={setSelectedContainer}
            selectedInfoContainer={selectedInfoContainer}
            setSelectedInfoContainer={setSelectedInfoContainer}
            onSelect={handleCreateContainer}
          />
        )}
        {selectedInfoContainer && (
          <div className="container-details-view">
            <button
              type="button"
              className="back-button"
              onClick={() => setSelectedInfoContainer(null)}
            >
              ← Back
            </button>

            <div className="container-details-layout">
              <aside className="container-details-sidebar">
                {containerTypes.map((container) => (
                  <button
                    type="button"
                    key={container.id}
                    className={`container-details-nav-button ${
                      selectedInfoContainer.id === container.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedInfoContainer(container)}
                  >
                    {container.name}
                  </button>
                ))}
              </aside>

              <div className="container-details-main">
                <div className="details-layout">
                  <div className="details-image">
                    <img
                      src={selectedInfoContainer.image}
                      alt={selectedInfoContainer.name}
                    />
                  </div>

                  <div className="details-content">
                    <h2 className="container-name-styling">
                      {selectedInfoContainer.name}
                    </h2>

                    <div className="container-specifications">
                      <h3>Specifications</h3>

                      <div className="specifications-grid">
                        {selectedInfoContainer.specifications.map((item) => (
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

                    <div className="container-description">
                      <h3>Description</h3>

                      {selectedInfoContainer.description.map(
                        (paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ),
                      )}
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

export default Addcontainermodal;
