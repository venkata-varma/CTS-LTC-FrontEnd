import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllVehiclesOfSession,
  deleteVehicle,
} from "../../../redux/features/vehicle/vehicleSlice";

import Addcontainermodal from "../Addcontainermodal/Addcontainermodal";
import Addtruckmodal from "../Addtruckmodal/Addtruckmodal";
import Vehiclecard from "../Vehiclecard/Vehiclecard";
import "./Containerstab.css";
import Editvehiclemodal from "../Editvehiclemodal/Editvehiclemodal";

function Containerstab() {
  const dispatch = useDispatch();

  const currentSession = useSelector(
    (state) => state.calculationSession.currentSession,
  );

  const { allVehicles, loading } = useSelector((state) => state.vehiclesApi);
  const [isAddContainerOpen, setIsAddContainerOpen] = useState(false);

  const [isAddTruckOpen, setIsAddTruckOpen] = useState(false);
  const [isEditVehicleOpen, setIsEditVehicleOpen] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  useEffect(() => {
    if (!currentSession?._id) {
      return;
    }

    dispatch(getAllVehiclesOfSession(currentSession._id));
  }, [currentSession?._id, dispatch]);

  const handleOpenEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);

    setIsEditVehicleOpen(true);
  };
  const handleDeleteVehicle = async (vehicle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${vehicle.vehicleName}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteVehicle(vehicle._id)).unwrap();

      await dispatch(getAllVehiclesOfSession(currentSession._id)).unwrap();
    } catch (error) {
      console.error("Failed to delete vehicle:", error);
    }
  };

  // ==========================================
  // Vehicle Type Selection Lock
  // ==========================================

  const hasContainers = allVehicles.some(
    (vehicle) => vehicle.vehicleType === "container",
  );

  const hasTrucks = allVehicles.some((vehicle) => vehicle.vehicleType === "truck");
  return (
    <>
      <div className="containers-tab">
        <button
          className="primary-btn add-vehicle-button"
          onClick={() => setIsAddContainerOpen(true)}
           disabled={hasTrucks}
        >
          Add Container
        </button>

        <button
          className="primary-btn add-vehicle-button"
          onClick={() => setIsAddTruckOpen(true)}
         disabled={hasContainers}
        >
          Add Truck
        </button>
      </div>

      <div className="vehicles-list">
        {allVehicles.map((vehicle) => (
          <Vehiclecard
            key={vehicle._id}
            vehicle={vehicle}
            onEdit={handleOpenEditVehicle}
            onDelete={handleDeleteVehicle}
          />
        ))}
      </div>

      <Addcontainermodal
        isOpen={isAddContainerOpen}
        onClose={() => setIsAddContainerOpen(false)}
      />

      <Addtruckmodal
        isOpen={isAddTruckOpen}
        onClose={() => setIsAddTruckOpen(false)}
      />
      <Editvehiclemodal
        isOpen={isEditVehicleOpen}
        onClose={() => setIsEditVehicleOpen(false)}
        vehicle={selectedVehicle}
      />
    </>
  );
}

export default Containerstab;
