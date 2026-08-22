import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import calculationSessionReducer from "./features/calculateSession/calculationSessionSlice";
import groupReducer from './features/group/groupSlice'
import productReducer from './features/product/productSlice'
import vehicleReducer from './features/vehicle/vehicleSlice'
import stuffingCalculationReducer from './features/stuffingCalculation/stuffingCalculationSlice'
// NEW
import chequeTrackingReducer from "./features/chequeTracking/chequeTrackingSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    calculationSession: calculationSessionReducer,
    groupsApi:groupReducer,
    productsApi:productReducer,
    vehiclesApi:vehicleReducer,
    stuffingCalculation:stuffingCalculationReducer,
    // NEW
    chequeTracking: chequeTrackingReducer,
  },
});
