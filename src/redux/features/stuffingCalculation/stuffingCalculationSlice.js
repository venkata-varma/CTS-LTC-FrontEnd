import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  calculateStuffingApi,
} from "./stuffingCalculationApi";

// ==========================================
// Calculate Stuffing Result
// ==========================================

export const calculateStuffing = createAsyncThunk(
  "stuffingCalculation/calculateStuffing",

  async (calculationSessionId, thunkAPI) => {
    try {
      return await calculateStuffingApi(
        calculationSessionId,
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Stuffing calculation failed.",
        },
      );
    }
  },
);

const initialState = {
  calculationResult: null,

  vehicleRequirement: null,

  productFitResults: [],

  vehicleAllocation: [],

  loading: false,

  error: null,
};

const stuffingCalculationSlice = createSlice({
  name: "stuffingCalculation",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==========================================
      // Calculate Stuffing
      // ==========================================

      .addCase(calculateStuffing.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(
        calculateStuffing.fulfilled,
        (state, action) => {
          state.loading = false;

          state.calculationResult =
            action.payload.data.calculationResult;

          state.vehicleRequirement =
            action.payload.data.vehicleRequirement;

          state.productFitResults =
            action.payload.data.productFitResults || [];

          state.vehicleAllocation =
            action.payload.data.vehicleAllocation || [];
        },
      )

      .addCase(
        calculateStuffing.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      );
  },
});

export default stuffingCalculationSlice.reducer;