import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Stuffingresulttab.css";

import { calculateStuffing } from "../../../redux/features/stuffingCalculation/stuffingCalculationSlice";
import Resultsummary from "./Resultsummary";
import Vehicleallocationcard from "./Vehicleallocationcard";

function Stuffingresulttab() {
  const dispatch = useDispatch();

  const { currentSession } = useSelector(
    (state) => state.calculationSession,
  );

  const {
    calculationResult,
    vehicleRequirement,
    productFitResults,
    vehicleAllocation,
    loading,
    error,
  } = useSelector(
    (state) => state.stuffingCalculation,
  );

  // ==========================================
  // Calculate Stuffing Result
  // ==========================================

  useEffect(() => {
    if (!currentSession?._id) {
      return;
    }

    dispatch(
      calculateStuffing(currentSession._id),
    );
  }, [dispatch, currentSession?._id]);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="stuffing-result">
        Calculating stuffing result...
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="stuffing-result">
        <p>
          {error.message ||
            "Unable to calculate stuffing result."}
        </p>
      </div>
    );
  }

  // ==========================================
  // No Result Yet
  // ==========================================

  if (!calculationResult) {
    return (
      <div className="stuffing-result">
        No stuffing result available.
      </div>
    );
  }

  // Temporary development check
  console.log(
    "Stuffing Calculation Result:",
    {
      calculationResult,
      vehicleRequirement,
      productFitResults,
      vehicleAllocation,
    },
  );

 return (
  <div className="stuffing-result">
    <Resultsummary
      calculationResult={calculationResult}
      vehicleRequirement={vehicleRequirement}
    />

     <div className="vehicle-allocation-list">
      {vehicleAllocation?.map((vehicle) => (
        <Vehicleallocationcard
          key={vehicle.vehicleNumber}
          vehicle={vehicle}
          vehicleName={vehicleRequirement.vehicleName}
          vehicleType={vehicleRequirement.vehicleType}
        />
      ))}
    </div>
  </div>
);
}

export default Stuffingresulttab;