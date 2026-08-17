import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createVehicleApi,
  getAllVehiclesOfSessionApi,
  updateVehicleApi,
  deleteVehicleApi,
} from "./vehicleApi";

export const createVehicle = createAsyncThunk(
  "vehicle/createVehicle",
  async (payload, thunkAPI) => {
    try {
      return await createVehicleApi(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllVehiclesOfSession = createAsyncThunk(
  "vehicle/getAllVehiclesOfSession",
  async (calculationSessionId, thunkAPI) => {
    try {
      return await getAllVehiclesOfSessionApi(calculationSessionId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const updateVehicle = createAsyncThunk(
  "vehicle/updateVehicle",
  async ({ vehicleId, payload }, thunkAPI) => {
    try {
      return await updateVehicleApi(vehicleId, payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteVehicle = createAsyncThunk(
  "vehicle/deleteVehicle",
  async (vehicleId, thunkAPI) => {
    try {
      return await deleteVehicleApi(vehicleId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  allVehicles: [],

  loading: false,

  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Create Vehicle

      .addCase(createVehicle.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(createVehicle.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(createVehicle.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Get All Vehicles

      .addCase(getAllVehiclesOfSession.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(getAllVehiclesOfSession.fulfilled, (state, action) => {
        state.loading = false;

        state.allVehicles = action.payload.data.getAllVehicles;
      })

      .addCase(getAllVehiclesOfSession.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      // Update Vehicle

      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(updateVehicle.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Delete Vehicle

      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(deleteVehicle.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteVehicle.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default vehicleSlice.reducer;
